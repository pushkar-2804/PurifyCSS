const express = require("express");
const cors = require("cors");
const app = express();
const bodyparser = require("body-parser");
const puppeteer = require("puppeteer");
const purify = require("purify-css");

// const { default: extractAndPurifyCss } = require("./utils/extractCss.js");

const router = express.Router();

app.use(bodyparser.json());
app.use(cors());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

router.get("/", (req, res) => {
  res.send("Hello World");
});

async function extractAndPurifyCss(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Navigate to the URL
  await page.goto(url, { waitUntil: "networkidle2" });

  // Extract HTML content
  const htmlContent = await page.content();

  // Extract CSS links
  const cssLinks = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]')
    );
    return links.map((link) => link.href);
  });

  // Download each CSS file
  const cssContents = [];
  for (const cssLink of cssLinks) {
    const cssContent = await page.evaluate(async (link) => {
      const response = await fetch(link);
      return response.text();
    }, cssLink);

    cssContents.push(cssContent);
  }

  await browser.close();

  // Combine CSS content into a single string
  const allCssContent = cssContents.join("\n");

  console.log("yaha tk ho gya hai");
  // Save purified CSS to a file
  const fs = require("fs");
  fs.writeFileSync("all.css", allCssContent);

  // Purify CSS
  const usedCss = purify(htmlContent, allCssContent, {
    info: true,
    minify: true,
  });

  fs.writeFileSync("used.css", usedCss);

  console.log("Used CSS saved to used.css");
  return usedCss;
}

router.get("/url", async (req, res) => {
  const url = req.body.url;
  console.log(url);
  const usedCss = await extractAndPurifyCss(url);
  res.sendFile("used.css", { root: __dirname });
});

app.use("/", router);
