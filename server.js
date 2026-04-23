// server.js
const express = require("express");
const puppeteer = require("puppeteer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let browser;

// Launch Puppeteer once
async function getBrowser() {
  if (!browser) {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--single-process",
        "--no-zygote",
      ],
    });
    console.log("✅ Puppeteer browser launched");
  }
  return browser;
}

// API route
app.get("/api/menu/:id", async (req, res) => {
  const { id } = req.params;
  console.log(`📦 Fetching Swiggy menu for restaurant ID: ${id}`);

  const swiggyUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.4608064&lng=73.80808689999999&restaurantId=${id}`;

  try {
    const browser = await getBrowser();
    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on("request", (req) => {
      if (["image", "font", "stylesheet"].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.goto(swiggyUrl, {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const data = await page.evaluate(() => {
      try {
        return JSON.parse(document.querySelector("pre")?.innerText || "{}");
      } catch {
        return null;
      }
    });

    await page.close();

    if (!data) {
      console.error("❌ Could not parse Swiggy response");
      return res.status(500).json({ error: "Failed to parse Swiggy response" });
    }

    console.log("✅ Successfully fetched menu data");
    res.json(data);
  } catch (error) {
    console.error("❌ Puppeteer error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("🛑 Closing Puppeteer browser...");
  if (browser) await browser.close();
  process.exit();
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
