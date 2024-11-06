import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white fixed top-0 left-0 w-full z-10">
      <div className="flex justify-between items-center max-w-screen-xl mx-auto">
        <h1 className="text-lg font-bold">Smart Procure</h1>
        <div>
          <Link to="/dashboard" className="mr-6 hover:underline">Dashboard</Link>
          <Link to="/search" className="hover:underline">Search</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
