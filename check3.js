import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("console", (msg) => {
    console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
  });

  page.on("pageerror", (err) => {
    console.log("[PAGE ERROR]", err.toString());
  });

  const checkPage = async (url) => {
    console.log(`\n--- Checking ${url} ---`);
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 10000 });
      await new Promise((r) => setTimeout(r, 2000));
    } catch (e) {
      console.log(`[NAV ERROR] ${url}:`, e.message);
    }
  };

  await checkPage("http://localhost:8080/");
  await checkPage("http://localhost:8080/admin/login");
  await checkPage("http://localhost:8080/product/default-1");

  await browser.close();
})();
