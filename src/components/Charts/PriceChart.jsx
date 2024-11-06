import React from 'react';
import { Line } from 'react-chartjs-2';

const PriceChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: 'Price over time',
        data: data.map((item) => item.price),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return <Line data={chartData} />;
};

export default PriceChart;
