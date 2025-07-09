import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle sidebar for mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-16 left-2 z-50 bg-blue-800 text-white p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={toggleSidebar}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>
      {/* Sidebar */}
      <div
        className={`fixed top-14 left-0 bg-gray-800 text-white w-2/3 sm:w-1/2 md:w-1/4 lg:w-1/5 min-h-screen p-6 z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        aria-label="Sidebar Navigation"
      >
        <h2 className="text-2xl font-semibold text-white mb-8">Features</h2>
        <ul className="space-y-4">
          <li>
            <Link
              to="/dashboard"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/search"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Search Products/Services
            </Link>
          </li>
          {/* New Product-Related Features */}
          <li>
            <Link
              to="/top-picks"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Top Product Picks
            </Link>
          </li>
          <li>
            <Link
              to="/new-arrivals"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              New Arrivals
            </Link>
          </li>
          <li>
            <Link
              to="/best-deals"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Best Deals & Offers
            </Link>
          </li>
          <li>
            <Link
              to="/product-categories"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Product Categories
            </Link>
          </li>
          <li>
            <Link
              to="/trending-products"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Trending Products
            </Link>
          </li>
          <li>
            <Link
              to="/recommended-for-you"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Recommended for You
            </Link>
          </li>
          <li>
            <Link
              to="/seasonal-picks"
              className="block py-2 px-4 text-white hover:bg-blue-600 rounded-lg transition-colors focus:outline-none focus:bg-blue-700"
            >
              Seasonal Picks
            </Link>
          </li>
        </ul>
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        ></div>
      )}
    </>
  );
};

export default Sidebar;
