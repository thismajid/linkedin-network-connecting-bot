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
  await login(email, password, page);
  await page.waitForTimeout(6000);
  await getNetwork(page);
  await page.waitForTimeout(5000);
  const myNetworks = await page.evaluate(() => [
    ...document.getElementsByClassName("artdeco-button"),
  ]);
  // const myNetworks = await page.evaluate(() => [
  //   ...document.querySelector(".artdeco-button").classList,
  // ]);
  console.log(myNetworks);
}

const getUserInfo = (text) => readline.question(text);

const login = async (email, password, page) =>
  Promise.all([
    await page.type("#username", email),
    await page.type("#password", password),
    await page.click('[type="submit"]'),
    await page.waitForNavigation(),
  ]);

const getNetwork = async (page) =>
  Promise.all([await page.goto("https://www.linkedin.com/mynetwork/")]);

main();
