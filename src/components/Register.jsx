import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';

const Register = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [user, setUser] = useState({
    id: null,

    email: '',
    password: '',

  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (!user.email || !user.password) {
        setError('Please fill in all the fields.');
        return;
      }

      const newUser = {
      
        email: user.email,
        password: user.password
      };

      const response = await axios.post('http://localhost:5000/api/register', newUser);

      const token = response.data;
      const userEmail = response.data.user.email;
  
      console.log(userEmail);
      setSuccess('Login successful!');
      login(token, userEmail);
      navigate('/dashboard');

      setUser({ id: null,email: '', password: ''});
    } catch (error) {
      console.error('Registration failed:', error);
      setError('Registration failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-green-200 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>

        {error && <div className="bg-red-200 text-red-700 p-2 mb-4 rounded">{error}</div>}
        {success && <div className="bg-green-200 text-green-700 p-2 mb-4 rounded">{success}</div>}

        <form onSubmit={handleRegister}>
     

          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

       

          

          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white p-3 rounded-lg w-full hover:shadow-lg transition duration-300 ease-in-out font-semibold"
          >
            Register
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Already registered?{' '}
            <span
              className="text-indigo-600 cursor-pointer underline hover:text-indigo-800"
              onClick={() => navigate('/')}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;