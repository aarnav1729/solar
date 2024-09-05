const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { scrapeMYSUN } = require('./scraper');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/scrape', async (req, res) => {
  const { location, monthlyBill, category } = req.body;

  try {
    const result = await scrapeMYSUN(location, monthlyBill, category);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape data', details: error.message });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});