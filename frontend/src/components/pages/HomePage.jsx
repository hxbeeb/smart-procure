import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  TagIcon, 
  MapPinIcon, 
  CurrencyRupeeIcon,
  ShoppingBagIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [currentStats, setCurrentStats] = useState({ products: 0, platforms: 0, searches: 0 });

  // Simulate initial page loading
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  // Animate statistics
  useEffect(() => {
    if (!statsLoading) return;
    
    const timer = setTimeout(() => {
      setCurrentStats({
        products: 1000000,
        platforms: 3,
        searches: 100000
      });
      setStatsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [statsLoading]);

  const searchOptions = [
    {
      title: 'Make And Model Search',
      description: 'Search across multiple parameters',
      icon: MagnifyingGlassIcon,
      path: '/query',
      color: 'bg-orange-800'
    },
    {
      title: 'Relevant Specifications',
      description: 'Search by product categories',
      icon: TagIcon,
      path: '/search/specifications',
      color: 'bg-white-800'
    },
    {
      title: 'Name Search',
      description: 'Search by product name',
      icon: ShoppingBagIcon,
      path: '/search/name',
      color: 'bg-green-800'
    },
    
    {
      title: 'Service Search',
      description: 'Search for government and private services',
      icon: BuildingOffice2Icon,
      path: '/search/services',
      color: 'bg-teal-800'
    }
  ];

  const handleOptionClick = (path) => {
    setIsLoading(true);
    setTimeout(() => {
      navigate(path);
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-blue-800 font-bold">Government of India</div>
          <div className="text-sm text-gray-600">Loading Official Portal...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-100">
      {/* Official Header */}
      <div className="text-center mb-16">
        <div className="flex justify-center mb-6">
          <img 
            src="/emblem.png" 
            alt="Government of India Emblem" 
            className="h-20"
          />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Product Finder
          </h1>
          {/* Language toggle hidden for now */}
          {/* <div className="flex justify-center gap-2 mb-4">
            <button className="px-4 py-1 bg-orange-500 text-white rounded">हिंदी</button>
            <button className="px-4 py-1 bg-blue-800 text-white rounded">English</button>
          </div> */}
          <p className="text-xl text-gray-600">
            Digital India Initiative: Unified B2B Marketplace Search
          </p>
        </motion.div>
      </div>

      {/* Analytics Section with Counter Animation */}
      <motion.div 
        className="mb-16 bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-semibold">Platform Statistics</h2>
          {statsLoading && (
            <div className="ml-4 w-4 h-4 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-gradient-to-r from-orange-100 to-orange-200 p-6 rounded-lg border border-blue-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-blue-800">
              {statsLoading ? '...' : currentStats.products.toLocaleString()}+
            </div>
            <div className="text-gray-700">Products Indexed</div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-green-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-green-800">
              {statsLoading ? '...' : currentStats.platforms.toLocaleString()}+
            </div>
            <div className="text-gray-700">Platforms Integrated</div>
          </motion.div>
          <motion.div 
            className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-purple-200"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-3xl font-bold text-purple-800">
              {statsLoading ? '...' : currentStats.searches.toLocaleString()}+
            </div>
            <div className="text-gray-700">Daily Searches</div>
          </motion.div>
        </div>
      </motion.div>

      {/* Search Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchOptions.map((option, index) => (
          <motion.button
            key={option.title}
            onClick={() => handleOptionClick(option.path)}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={option.title}
          >
            <div className={`${option.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              {option.title === 'Relevant Specifications' ? (
                <option.icon className="w-6 h-6 text-blue-800" aria-hidden="true" />
              ) : (
                <option.icon className="w-6 h-6 text-white" aria-hidden="true" />
              )}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">{option.title}</h3>
            <p className="text-gray-700">{option.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Footer */}
      <motion.div 
        className="mt-16 text-center text-sm text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <br></br>
        <p>© 2024 Government of India - NTRO</p>
        <p>Last Updated: {new Date().toLocaleDateString()}</p>
        <p> Developed  In SMART INDIA HACKATHON 2024 GRAND FINALE SOFTWARE EDITION</p>

      </motion.div>
      <motion.div 
  className="mt-0 text-center text-sm text-gray-600"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1 }}
>
 

  
</motion.div>
<div className="flex justify-center gap-8 mb-0">
    <img src="pic1.png" alt="Image 1" className="w-[500px] h-[200px] object-contain" />
    
  </div>
<p className="text-sm justify-left font-semibold text-gray-800">
    #ByteKnightsHyd
  </p>
    </div>
  );
};

export default HomePage; 