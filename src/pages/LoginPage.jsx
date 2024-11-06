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
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-lg mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
            Login
          </button>
        </form>
        {/* <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            New to the site?{' '}
            <button
              onClick={() => navigate('/register')} // Navigate to the register page
              className="text-blue-500 hover:underline"
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
