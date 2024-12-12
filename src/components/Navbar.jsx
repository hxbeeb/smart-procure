import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Navbar = () => {
  const { userEmail, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#1E3A8A] text-white py-1 shadow-lg fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 md:px-6 flex flex-wrap justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img 
            src="https://presentations.gov.in/wp-content/uploads/2020/01/NE_Preview1.png" 
            alt="Government Emblem" 
            className="h-8 w-8 md:h-10 md:w-10"
          />
          <div className="hidden md:block">
            <h1 className="text-sm md:text-lg font-semibold tracking-wider">
              Government Enterprise Management
            </h1>
            <p className="text-xs md:text-sm text-gray-300 uppercase tracking-widest">
              Procurement & Resource Ecosystem
            </p>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/e/e5/Close_icon.svg" 
              alt="Close Menu" 
              className="h-6 w-6"
            />
          ) : (
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Hamburger_icon.svg" 
              alt="Open Menu" 
              className="h-6 w-6"
            />
          )}
        </button>

        {/* Navigation Links */}
        <div className={`w-full md:w-auto ${mobileMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center mt-4 md:mt-0`}>
          
        <Link
            to="/querymake"
            className="block md:inline-block text-center text-sm font-medium text-white hover:text-yellow-300 transition-colors duration-300 uppercase tracking-wider"
            onClick={() => setMobileMenuOpen(false)}
          >
            Search
          </Link>
          <Link
            to="/dashboard"
            className="block md:inline-block text-center text-sm font-medium text-white hover:text-yellow-300 transition-colors duration-300 uppercase tracking-wider"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          {/* Add more links here */}
          <button
            onClick={handleLogout}
            className="block md:inline-block text-center text-sm font-medium text-white bg-red-500 hover:bg-red-600 py-1 px-4 rounded transition-colors duration-300 uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
