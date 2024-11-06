// src/pages/HomePage.jsx
import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-semibold text-blue-600 mb-4">Welcome to Smart Procure</h1>
      <p className="text-xl text-gray-700 mb-6">Your one-stop solution for price benchmarking.</p>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
