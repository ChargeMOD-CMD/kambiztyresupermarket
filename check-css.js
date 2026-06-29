import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle0' });
  
  // Check if a tailwind class is applied
  const isStyled = await page.evaluate(() => {
    const el = document.querySelector('h1');
    if (!el) return false;
    const style = window.getComputedStyle(el);
    return {
      fontSize: style.fontSize,
      fontWeight: style.fontWeight,
      color: style.color
    };
  });
  
  console.log('H1 Styles:', isStyled);
  await browser.close();
})();
