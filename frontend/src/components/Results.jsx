import React from 'react';
import { FaTree, FaCar, FaLightbulb } from 'react-icons/fa';

const Results = ({ data }) => {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Recommended Solar System Size</h2>
          <p>{data.solarSystemSize} kW</p>
          <p>Area required: {data.areaRequired} sqft</p>
          <p>With Net Metering: {data.netMetering ? 'Yes' : 'No'}</p>
        </div>
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Your Monthly Bill</h2>
          <div className="flex items-center">
            <span className="block text-lg">₹{data.currentBill}</span>
            <FaLightbulb className="ml-2 text-yellow-500 text-3xl" />
          </div>
          <div className="flex items-center">
            <span className="block text-lg">₹{data.billWithSolar}</span>
            <FaLightbulb className="ml-2 text-yellow-500 text-3xl" />
          </div>
          <p className="text-lg text-orange-500">Start Saving {data.savingsPercentage}% from Day 1</p>
        </div>
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Your Contribution to the Environment</h2>
          <div className="flex items-center">
            <FaTree className="text-green-500 text-3xl" />
            <span className="ml-2">{data.treesAdded} trees added</span>
          </div>
          <div className="flex items-center">
            <FaCar className="text-red-500 text-3xl" />
            <span className="ml-2">{data.carsOffRoad} cars off the road</span>
          </div>
        </div>
        <div className="border p-4 rounded-md shadow-md">
          <h2 className="text-xl font-bold">Financial Metrics</h2>
          <div className="flex items-center">
            <FaLightbulb className="text-yellow-500 text-3xl" />
            <span className="ml-2">System Cost: ₹{data.systemCost} Lacs</span>
          </div>
          <div className="flex items-center">
            <FaLightbulb className="text-yellow-500 text-3xl" />
            <span className="ml-2">Lifetime Savings: ₹{data.lifetimeSavings} Lacs</span>
          </div>
          <div className="flex items-center">
            <FaLightbulb className="text-yellow-500 text-3xl" />
            <span className="ml-2">Return on Investment: {data.roi}% p.a.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;