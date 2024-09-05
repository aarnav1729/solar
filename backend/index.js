const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/api/generate-report', (req, res) => {
  const { location, monthlyBill, buildingType, category } = req.body;

  // Convert monthly bill to integer
  const currentBill = parseInt(monthlyBill, 10);

  // Improved calculation logic
  const costPerKW = 1000;
  const areaPerKW = 100;
  let savingsPercentage;
  let costFactor;
  let roi;

  switch (category) {
    case 'residential':
      savingsPercentage = 97;
      costFactor = 0.52;
      roi = 25.3;
      break;
    case 'commercial':
      savingsPercentage = 61;
      costFactor = 0.36;
      roi = 19.9;
      break;
    case 'industrial':
      savingsPercentage = 85;
      costFactor = 0.36;
      roi = 30.4;
      break;
    default:
      savingsPercentage = 97;
      costFactor = 0.52;
      roi = 25.3;
      break;
  }

  const solarSystemSize = Math.ceil(currentBill / costPerKW);
  const areaRequired = solarSystemSize * areaPerKW;
  const billWithSolar = Math.ceil(currentBill * (1 - savingsPercentage / 100));
  const treesAdded = Math.round(solarSystemSize * 43.78);
  const carsOffRoad = Math.round(solarSystemSize * 1.11);
  const systemCost = (solarSystemSize * costFactor).toFixed(1); // in Lakhs
  const lifetimeSavings = (solarSystemSize * 3.29).toFixed(1); // in Lakhs

  // Respond with calculated data
  const data = {
    solarSystemSize,
    areaRequired,
    netMetering: true,
    currentBill,
    billWithSolar,
    savingsPercentage,
    treesAdded,
    carsOffRoad,
    systemCost,
    lifetimeSavings,
    roi,
  };

  res.json(data);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});