const puppeteer = require("puppeteer");
const readline = require("readline-sync");

let email, password;

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/login", {
    waitUntil: "networkidle0",
  });

  email = readline.question(`What is your linkedin email ? `);
})();
