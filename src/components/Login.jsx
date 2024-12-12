import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming this exists

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: ""
  });

  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Check if the user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/querymake');
    }
  }, [isLoggedIn, navigate]);

  function generateCaptcha() {
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  }

  const handleCaptchaRefresh = () => {
    setCaptchaCode(generateCaptcha());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!formData.email || !formData.password) {
        setError('Please fill in all the fields.');
        return;
      }

      if (captchaInput !== captchaCode) {
        setError('Incorrect captcha. Please try again.');
        return;
      }

      const loginData = {
        email: formData.email,
        password: formData.password
      };

      const response = await axios.post('http://localhost:5000/api/auth/login', loginData);

      if (response.status === 200) {
        const token = response.data;
        const userEmail = response.data.user.email;
        setSuccess('Login successful!');
        login(token, userEmail);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center items-center space-x-4">
          <img
            src="https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png"
            alt="National Emblem of India"
            className="h-20 w-20"
          />
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 text-center">
              Government of India
            </h1>
            <p className="text-xl text-gray-600 text-center">
              Interdepartmental Portal
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border-2 border-blue-900">
            <form className="space-y-6" onSubmit={handleLogin}>
              {error && (
                <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded relative" role="alert">
                  {success}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="captcha" className="block text-sm font-medium text-gray-700">
                  Security Verification
                </label>
                <div className="mt-1 flex items-center space-x-2">
                  <input
                    id="captcha"
                    name="captcha"
                    type="text"
                    required
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Enter captcha"
                    className="flex-grow appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                  <div className="bg-gray-200 px-4 py-2 rounded-md text-lg font-bold tracking-widest select-none">
                    {captchaCode}
                  </div>
                  <button
                    type="button"
                    onClick={handleCaptchaRefresh}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Refresh
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign In
                </button>
              </div>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  New User?{' '}
                  <span
                    onClick={() => navigate("/register")}
                    className="font-medium text-blue-900 hover:text-blue-700 cursor-pointer"
                  >
                    Create an Account
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Government of India. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Secure Access Portal - Authorized Personnel Only
          </p>
        </div>
      </div>
    </div>
  );
}