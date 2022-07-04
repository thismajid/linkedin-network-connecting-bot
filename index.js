const puppeteer = require("puppeteer");
const readline = require("readline-sync");

async function main() {
  const email = getUserInfo("What is your linkedin email ? ");
  const password = getUserInfo("What is your linkedin password ? ");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--window-size=1920,1080"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.linkedin.com/login", {
    waitUntil: "networkidle0",
  });
}

const getUserInfo = (text) => readline.question(text);

main();
