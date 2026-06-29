import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const checkPage = async (url) => {
    console.log(`\n--- Checking ${url} ---`);
    try {
      await page.goto(url, { waitUntil: "networkidle0", timeout: 10000 });
      const text = await page.evaluate(() => document.body.innerText);
      console.log(text.substring(0, 300) + "...");
      if (text.includes("This page didn't load") || text.includes("Something went wrong")) {
        console.log(`CRASH DETECTED ON ${url}!`);
      }
    } catch (e) {
      console.log(`Nav error ${url}:`, e.message);
    }
  };

  await checkPage("http://localhost:8080/");
  await checkPage("http://localhost:8080/admin/login");
  await checkPage("http://localhost:8080/admin/dashboard");
  await checkPage("http://localhost:8080/product/default-1");

  await browser.close();
})();
