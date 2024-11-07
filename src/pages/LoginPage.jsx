// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom for navigation

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add the logic for login validation if needed.
    // After login (even without validation), navigate to the dashboard or other page.
    navigate('/dashboard'); // Navigate to a protected page (e.g., dashboard)
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-500 flex items-center justify-center transition-all duration-300">
      <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md w-full transform transition-all duration-300 ease-in-out hover:scale-105">
        <h2 className="text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 text-lg font-medium">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-lg font-medium">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white py-3 px-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Login
          </button>
        </form>
        {/* Uncomment this section if you want to add the register link */}
        {/* <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            New to the site?{' '}
            <button
              onClick={() => navigate('/register')} // Navigate to the register page
              className="text-blue-500 hover:underline hover:text-blue-600 transition duration-300 ease-in-out"
            >
              Create an account
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
