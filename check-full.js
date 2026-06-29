import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let errorsFound = false;

  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.type() === "warning") {
      console.log(`[BROWSER ${msg.type().toUpperCase()}] ${msg.text()}`);
      errorsFound = true;
    }
  });

  page.on("pageerror", (err) => {
    console.log("[PAGE CRASH]", err.toString());
    errorsFound = true;
  });

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    if (status >= 400 && !url.includes("favicon.ico")) {
      console.log(`[NETWORK ERROR] ${status} on ${url}`);
      errorsFound = true;
    }
  });

  const checkPage = async (url) => {
    console.log(`\n--- Checking ${url} ---`);
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 15000 });
      // wait a bit for any late rendering issues
      await new Promise((r) => setTimeout(r, 2000));
      const bodyText = await page.evaluate(() => document.body.innerText);
      if (bodyText.includes("This page didn't load") || bodyText.includes("Something went wrong")) {
        console.log(`[UI CRASH DETECTED] Error boundary text found on ${url}!`);
        errorsFound = true;
      }
    } catch (e) {
      console.log(`[NAV ERROR] ${url}:`, e.message);
      errorsFound = true;
    }
  };

  const pagesToTest = [
    "http://localhost:8080/",
    "http://localhost:8080/products",
    "http://localhost:8080/product/default-1",
    "http://localhost:8080/cart",
    "http://localhost:8080/checkout",
    "http://localhost:8080/admin/login",
    "http://localhost:8080/admin/dashboard",
  ];

  for (const p of pagesToTest) {
    await checkPage(p);
  }

  await browser.close();
  if (!errorsFound) console.log("\nSUCCESS: ZERO ERRORS FOUND IN BROWSER!");
})();
