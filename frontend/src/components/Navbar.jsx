import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const menuItems = [
    { name: 'Home', path: '/' },
    { 
      name: 'Services', 
      path: '/services',
      subMenu: [
        { name: 'Government Services', path: '/services/government' },
        { name: 'Private Services', path: '/services/private' },
        { name: 'International Services', path: '/services/international' },
      ],
    },
    { 
      name: 'Products', 
      path: '/products',
      subMenu: [
        { name: 'Product Categories', path: '/products/categories' },
        { name: 'New Arrivals', path: '/products/new' },
        { name: 'Best Sellers', path: '/products/best-sellers' },
      ],
    },
    { name: 'Specifications', path: '/specifications' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdown = (index) => {
    if (dropdownOpen === index) {
      setDropdownOpen(null);
    } else {
      setDropdownOpen(index);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-white to-white text-green-900 fixed w-full z-50 shadow-lg" aria-label="Main Navigation">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-0">
        <div className="flex justify-between h-[100px] items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" aria-label="Home">
              <img 
                src="66.png" 
                alt="Logo" 
                className="h-[65px] sm:h-20 md:h-[90px]"
              />
            </Link>
            <span className="ml-3 text-2xl font-bold"></span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-4">
            {menuItems.map((item, index) => (
              <div key={index} className="relative">
                {!item.subMenu ? (
                  <Link 
                    to={item.path}
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button
                      onClick={() => handleDropdown(index)}
                      className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-800"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen === index}
                    >
                      {item.name}
                      <ChevronDownIcon className="w-5 h-5 ml-1" />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen === index && (
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10"
                        >
                          <div className="py-1">
                            {item.subMenu.map((subItem, subIndex) => (
                              <Link 
                                key={subIndex}
                                to={subItem.path}
                                className="block px-4 py-2 text-sm hover:bg-gray-100 focus:bg-gray-200"
                                onClick={() => setDropdownOpen(null)}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-blue-800 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-800"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-blue-100 shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItems.map((item, index) => (
                <div key={index} className="relative">
                  {!item.subMenu ? (
                    <Link 
                      to={item.path}
                      className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white transition-colors focus:outline-none focus:bg-blue-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => handleDropdown(index)}
                        className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 hover:text-white transition-colors focus:outline-none focus:bg-blue-800"
                        aria-haspopup="true"
                        aria-expanded={dropdownOpen === index}
                      >
                        {item.name}
                        <ChevronDownIcon className="w-5 h-5" />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen === index && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="pl-4"
                          >
                            {item.subMenu.map((subItem, subIndex) => (
                              <Link 
                                key={subIndex}
                                to={subItem.path}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:bg-blue-800"
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setDropdownOpen(null);
                                }}
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
