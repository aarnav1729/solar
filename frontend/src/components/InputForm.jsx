import React, { useState } from 'react';

const InputForm = ({ onSubmit }) => {
  const [location, setLocation] = useState('');
  const [monthlyBill, setMonthlyBill] = useState('');
  const [buildingType, setBuildingType] = useState('existing');
  const [category, setCategory] = useState('residential');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, monthlyBill, buildingType, category });
  };

  const detectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
      }, (error) => {
        console.error("Error detecting location", error);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-around mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="existing"
              checked={buildingType === 'existing'}
              onChange={() => setBuildingType('existing')}
              className="mr-2"
            />
            Existing Building
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="new"
              checked={buildingType === 'new'}
              onChange={() => setBuildingType('new')}
              className="mr-2"
            />
            New Building
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button
            type="button"
            onClick={detectLocation}
            className="ml-2 p-2 bg-gray-200 rounded-md"
          >
            Detect
          </button>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your average monthly electricity bill (Rs.)"
            value={monthlyBill}
            onChange={(e) => setMonthlyBill(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="flex justify-around mb-4">
          <button
            type="button"
            onClick={() => setCategory('residential')}
            className={`px-4 py-2 rounded ${category === 'residential' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            Residential
          </button>
          <button
            type="button"
            onClick={() => setCategory('commercial')}
            className={`px-4 py-2 rounded ${category === 'commercial' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            Commercial
          </button>
          <button
            type="button"
            onClick={() => setCategory('industrial')}
            className={`px-4 py-2 rounded ${category === 'industrial' ? 'bg-gray-800 text-white' : 'bg-gray-200'}`}
          >
            Industrial
          </button>
        </div>
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded-md">Calculate</button>
      </form>
    </div>
  );
};

export default InputForm;