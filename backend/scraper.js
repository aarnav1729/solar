const puppeteer = require('puppeteer');

async function scrapeMYSUN(location, monthlyBill, category) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Navigate to the MYSUN calculator page
    await page.goto('https://www.itsmysun.com/solar-calculator/', { waitUntil: 'networkidle2' });

    // Enter the location
    await page.type('input[name="location"]', location);

    // Enter the monthly bill
    await page.type('input[name="monthlyBill"]', monthlyBill.toString());

    // Select the category
    if (category === 'residential') {
      await page.click('input[value="Residential"]');
    } else if (category === 'commercial') {
      await page.click('input[value="Commercial"]');
    } else if (category === 'industrial') {
      await page.click('input[value="Industrial"]');
    }

    // Click on the calculate button
    await page.click('button[type="submit"]');

    // Wait for the results to load
    await page.waitForSelector('.result-selector', { timeout: 10000 });

    // Scrape the results
    const result = await page.evaluate(() => {
      const solarSystemSize = document.querySelector('.solar-system-size-selector').innerText;
      const areaRequired = document.querySelector('.area-required-selector').innerText;
      const billWithSolar = document.querySelector('.bill-with-solar-selector').innerText;
      const savingsPercentage = document.querySelector('.savings-percentage-selector').innerText;
      const treesAdded = document.querySelector('.trees-added-selector').innerText;
      const carsOffRoad = document.querySelector('.cars-off-road-selector').innerText;
      const systemCost = document.querySelector('.system-cost-selector').innerText;
      const lifetimeSavings = document.querySelector('.lifetime-savings-selector').innerText;
      const roi = document.querySelector('.roi-selector').innerText;

      return {
        solarSystemSize,
        areaRequired,
        billWithSolar,
        savingsPercentage,
        treesAdded,
        carsOffRoad,
        systemCost,
        lifetimeSavings,
        roi
      };
    });

    await browser.close();
    return result;
  } catch (error) {
    await browser.close();
    throw error;
  }
}

module.exports = { scrapeMYSUN };