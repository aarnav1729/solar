import React, { useState } from 'react';
import InputForm from './components/InputForm';
import Results from './components/Results';

const App = () => {
  const [data, setData] = useState(null);

  const handleFormSubmit = (formData) => {
    fetch('http://localhost:5000/api/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <InputForm onSubmit={handleFormSubmit} />
      {data && <Results data={data} />}
    </div>
  );
};

export default App;