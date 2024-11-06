// src/pages/DashboardPage.jsx
import React from 'react';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import Navbar from '../components/Navbar';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 p-8 w-full flex justify-center items-center">
          {/* Centered Box */}
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard</h1>
            <p className="text-xl text-gray-700 mb-6">
              Welcome back! Here's a summary of your recent activities and procurement benchmarks.
            </p>

            {/* Quick Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-blue-800">Total Products</h2>
                <p className="text-2xl text-blue-700">120</p>
              </div>
              <div className="bg-yellow-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-yellow-800">Pending Requests</h2>
                <p className="text-2xl text-yellow-700">8</p>
              </div>
              <div className="bg-green-100 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-green-800">Completed Tasks</h2>
                <p className="text-2xl text-green-700">45</p>
              </div>
            </div>

            {/* Call to Action */}
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300 mt-6 w-full sm:w-auto">
              View Benchmarking Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
