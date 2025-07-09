import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const ActivePriceDifferences = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetching data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Replace with your API URL or data source
        const response = await axios.get('http://localhost:8000/api/getPriceData');
        const data = response.data;
        setPrices(data);
      } catch (error) {
        console.error('Error fetching price data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Active Price Differences</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={prices}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivePriceDifferences;
