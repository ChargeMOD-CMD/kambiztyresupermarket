import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.on("response", (response) => {
    if (response.status() >= 400) {
      console.log(`Failed Request [${response.status()}]: ${response.url()}`);
    }
  });

  page.on("console", (msg) => {
    if (msg.type() === "error") {
      console.log("BROWSER ERROR:", msg.text());
    }
  });

  page.on("pageerror", (err) => {
    console.log("PAGE ERROR:", err.toString());
  });

  try {
    await page.goto("http://localhost:8080", { waitUntil: "networkidle2", timeout: 10000 });
  } catch (e) {}

  const links = ["/admin/login", "/admin/dashboard", "/cart", "/checkout"];
  for (const link of links) {
    try {
      await page.goto(`http://localhost:8080${link}`, { waitUntil: "networkidle2", timeout: 5000 });
    } catch (e) {
      console.log(`Nav error ${link}:`, e.message);
    }
  }

  await browser.close();
})();
