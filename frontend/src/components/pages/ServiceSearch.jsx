// import React, { useState } from 'react';
// import axios from 'axios';

// const ServiceSearch = () => {
//   const [formData, setFormData] = useState({
//     department: '',
//     service: '',
//     location: '',
//     description: ''
//   });
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Service categories and their services
//   const departmentServices = {
//     'Transportation and Logistics': [
//       'Cab and Vehicle Rental Services',
//       'Heavy Equipment Transportation',
//       'Crane and Lifting Services',
//       'Commercial Truck Rental',
//       'Emergency Vehicle Maintenance',
//       'Fleet Management Services',
//       'GPS Tracking and Monitoring',
//       'Specialized Transport for Equipment',
//       'Bus Hiring Service - Short Term',
//       'Vehicle Hiring Service - Per Vehicle-Day basis',
//       'Goods Transport Service - Per Trip based Service',
//       'Goods Transport Service - Per KM Based Service'
//     ],
//     'Maintenance and Facilities': [
//       'Building Cleaning and Janitorial Services',
//       'HVAC Maintenance',
//       'Electrical System Repair',
//       'Plumbing Services',
//       'Landscaping and Ground Maintenance',
//       'Security System Installation',
//       'Office Equipment Repair',
//       'Pest Control Services',
//       'Annual Maintenance Service - Desktops, Laptops, and Peripherals',
//       'Annual Maintenance Service - AIR CONDITIONER',
//       'Annual Maintenance Service - Photocopier Machine'
//     ],
//     'Printing and Stationery': [
//       'Non-Paper Printing Services - Quantity Based',
//       'Non-Paper Printing Services - Area Based',
//       'Paper-based Printing Services',
//       'Custom Bid for Services',
//       'Data Recovery and Data Wiping Service'
//     ],
//     'Catering and Events': [
//       'Catering service (Duration Based)',
//       'Catering service (Event Based)',
//       'Canteen Service - Percentage Model',
//       'Short Term Cab & Taxi Hiring Services',
//       'Hiring of Sanitation Service'
//     ],
//     'Security and Manpower': [
//       'Security Manpower Service (Version 2.0)',
//       'Manpower Outsourcing Services - Minimum wage',
//       'Manpower Outsourcing Services - Fixed Remuneration',
//       'Facility Management Service - Manpower based (Version 2)',
//       'Hiring of Mortuary Van'
//     ],
//     'Home Appliance Dealers': [
//       'AC Dealers',
//       'Air Cooler Dealers',
//       'Air Purifier Dealers',
//       'Exhaust Fan Dealers',
//       'Fan Dealers',
//       'Audio Visual Equipment Dealers',
//       'DVD Player Dealers',
//       'Home Theatre Dealers',
//       'iPad Dealers',
//       'iPod Dealers',
//       'Music System Dealers',
//       'Projector Dealers',
//       'Satellite TV Dealers',
//       'TV Dealers',
//       'Bean Bag Dealers',
//       'EPABX Dealers',
//       'Generators Dealers',
//       'Industrial Voltage Stabilizers Dealers',
//       'Online UPS Dealers',
//       'Washing Machine Dealers',
//       'Photocopier Dealers',
//       'Sign Board Agencies',
//       'Gas Geyser Dealers',
//       'Gas Water Heater Dealers',
//       'UPS Dealers',
//       'Water Purifier Dealers'
//     ],
//     'Kitchen Appliances': [
//       'Dishwasher Dealers',
//       'Flask Dealers',
//       'Gas Stove Dealers',
//       'Induction Stove Dealers',
//       'Microwave Oven Dealers',
//       'Mixer Grinder Dealers',
//       'Modular Kitchen Dealers',
//       'Refrigerator Dealers',
//       'Water Cooler Dealers',
//       'Water Dispenser Dealers'
//     ],
//     'Safety and Security': [
//       'CCTV Dealers',
//       'Firefighting Equipment Dealers',
//       'Security System Dealers'
//     ]
//   };
  

//   // Common locations
//   const locations = [
//     'Delhi',
//     'Mumbai',
//     'Bangalore',
//     'Chennai',
//     'Kolkata',
//     'Hyderabad',
//     'Pune',
//     'Ahmedabad',
//     'Other'
//   ];



//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value,
//       // Reset service if department changes
//       ...(name === 'department' && { service: '' })
//     }));
//   };

//   const handleSearch = async () => {
//     if (!formData.department || !formData.service) {
//       setError('Please select both department and service');
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       // Construct 'ss' from service and description
//       let ssArray = [];
//       if (formData.service) ssArray.push(formData.service.toLowerCase());
//       if (formData.description) ssArray.push(formData.description.toLowerCase());

//       // Always append 'service' at the end
//       ssArray.push('service');

//       // Replace spaces with '+'
//       const ss = ssArray.join('+').replace(/\s+/g, '+');

//       // Construct 'cq' from location
//       const cq = formData.location.toLowerCase().replace(/\s+/g, '+');

//       // Send the request with 'ss' and 'cq' parameters
//       const response = await axios.get('http://127.0.0.1:5000/api/scrape-results', {
//         params: {
//           ss: ss,
//           cq: cq
//         }
//       });

//       setResults(response.data.results || []);
//     } catch (err) {
//       // Capture more detailed error messages
//       if (err.response && err.response.data && err.response.data.error) {
//         setError(err.response.data.error);
//       } else {
//         setError(err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const now = new Date();
//         const diffTime = Math.abs(now - date);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
//         if (diffDays === 1) return 'Yesterday';
//         if (diffDays < 7) return `${diffDays} days ago`;
//         if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
//         if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
//         return `${Math.floor(diffDays / 365)} years ago`;
//       };
    

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Service Search</h1>
      
//       <div className="bg-white rounded-lg shadow p-6 mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           {/* Department Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Government Department
//             </label>
//             <select
//               name="department"
//               value={formData.department}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             >
//               <option value="">Select Department</option>
//               {Object.keys(departmentServices).map(dept => (
//                 <option key={dept} value={dept}>{dept}</option>
//               ))}
//             </select>
//           </div>

//           {/* Service Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Service Type
//             </label>
//             <select
//               name="service"
//               value={formData.service}
//               onChange={handleInputChange}
//               disabled={!formData.department}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
//             >
//               <option value="">Select Service</option>
//               {formData.department && departmentServices[formData.department].map(service => (
//                 <option key={service} value={service}>{service}</option>
//               ))}
//             </select>
//           </div>

//           {/* Location Selection */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Location
//             </label>
//             <select
//               name="location"
//               value={formData.location}
//               onChange={handleInputChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//             >
//               <option value="">Select Location</option>
//               {locations.map(location => (
//                 <option key={location} value={location}>{location}</option>
//               ))}
//             </select>
//           </div>

//           {/* Description Input */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Additional Description
//             </label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               placeholder="Enter any additional requirements..."
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
//               rows="3"
//             />
//           </div>
//         </div>

//         <button
//           onClick={handleSearch}
//           disabled={loading || !formData.department || !formData.service}
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
//         >
//           {loading ? 'Searching...' : 'Search Services'}
//         </button>
//       </div>

//       {error && (
//         <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
//           {error}
//         </div>
//       )}

//       {results.length > 0 && (
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service Provider
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Service Details
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Price
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Location
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Posted
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {results.map((result, index) => (
//                 <tr key={index}>
//                   <td className="px-6 py-4">
//                     <div className="text-sm font-medium text-gray-900">
//                       {result.title}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm text-gray-900">{result.service_description}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{result.price}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{result.location}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <div className="text-sm text-gray-900">{formatDate(result.posted_date)}</div>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//                     <button className="text-indigo-600 hover:text-indigo-900">View</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ServiceSearch;















import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdvancedServiceSearch() {
  const [searchParams, setSearchParams] = useState({
    department: "",
    service: "",
    location: "",
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const departmentServices = {
    'Transportation and Logistics': [
      'Cab and Vehicle Rental Services',
      'Heavy Equipment Transportation',
      'Crane and Lifting Services',
      'Commercial Truck Rental',
      'Emergency Vehicle Maintenance',
      'Fleet Management Services',
      'GPS Tracking and Monitoring',
      'Specialized Transport for Equipment',
      'Bus Hiring Service - Short Term',
      'Vehicle Hiring Service - Per Vehicle-Day basis',
      'Goods Transport Service - Per Trip based Service',
      'Goods Transport Service - Per KM Based Service'
    ],
    'Maintenance and Facilities': [
      'Building Cleaning and Janitorial Services',
      'HVAC Maintenance',
      'Electrical System Repair',
      'Plumbing Services',
      'Landscaping and Ground Maintenance',
      'Security System Installation',
      'Office Equipment Repair',
      'Pest Control Services',
      'Annual Maintenance Service - Desktops, Laptops, and Peripherals',
      'Annual Maintenance Service - AIR CONDITIONER',
      'Annual Maintenance Service - Photocopier Machine'
    ],
    'Printing and Stationery': [
      'Non-Paper Printing Services - Quantity Based',
      'Non-Paper Printing Services - Area Based',
      'Paper-based Printing Services',
      'Custom Bid for Services',
      'Data Recovery and Data Wiping Service'
    ],
    'Catering and Events': [
      'Catering service (Duration Based)',
      'Catering service (Event Based)',
      'Canteen Service - Percentage Model',
      'Short Term Cab & Taxi Hiring Services',
      'Hiring of Sanitation Service'
    ],
    'Security and Manpower': [
      'Security Manpower Service (Version 2.0)',
      'Manpower Outsourcing Services - Minimum wage',
      'Manpower Outsourcing Services - Fixed Remuneration',
      'Facility Management Service - Manpower based (Version 2)',
      'Hiring of Mortuary Van'
    ],
    'Home Appliance Dealers': [
      'AC Dealers',
      'Air Cooler Dealers',
      'Air Purifier Dealers',
      'Exhaust Fan Dealers',
      'Fan Dealers',
      'Audio Visual Equipment Dealers',
      'DVD Player Dealers',
      'Home Theatre Dealers',
      'iPad Dealers',
      'iPod Dealers',
      'Music System Dealers',
      'Projector Dealers',
      'Satellite TV Dealers',
      'TV Dealers',
      'Bean Bag Dealers',
      'EPABX Dealers',
      'Generators Dealers',
      'Industrial Voltage Stabilizers Dealers',
      'Online UPS Dealers',
      'Washing Machine Dealers',
      'Photocopier Dealers',
      'Sign Board Agencies',
      'Gas Geyser Dealers',
      'Gas Water Heater Dealers',
      'UPS Dealers',
      'Water Purifier Dealers'
    ],
    'Kitchen Appliances': [
      'Dishwasher Dealers',
      'Flask Dealers',
      'Gas Stove Dealers',
      'Induction Stove Dealers',
      'Microwave Oven Dealers',
      'Mixer Grinder Dealers',
      'Modular Kitchen Dealers',
      'Refrigerator Dealers',
      'Water Cooler Dealers',
      'Water Dispenser Dealers'
    ],
    'Safety and Security': [
      'CCTV Dealers',
      'Firefighting Equipment Dealers',
      'Security System Dealers'
    ]
  };
  
  const locations = [
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const searchString = `${searchParams.service}+${searchParams.location}`;
    console.log("Search String:", searchString);

    setLoading(true);
    setError(null);
    setData([]);

    try {
      const response = await axios.get(`http://localhost:5001/service-scrape`, {
        params: { search: searchString },
      });

      console.log("Backend Response:", response.data);

      const combinedData = response.data.map((item) => ({
        ...item,
        source: item.source || "Unknown", // Optional: Add default source
      }));

      setData(combinedData);
    } catch (err) {
      setError(err.message || "Error fetching data from the backend");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchParams.department) {
      setSearchParams((prevParams) => ({
        ...prevParams,
        service: "",
      }));
    }
  }, [searchParams.department]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Advanced Service Search
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="grid grid-cols-1 gap-6 mb-6">
            {/* Department Dropdown */}
            <div>
              <label
                htmlFor="department"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Department
              </label>
              <select
                id="department"
                name="department"
                value={searchParams.department}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a Department</option>
                {Object.keys(departmentServices).map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            {/* Service Dropdown */}
            <div>
              <label
                htmlFor="service"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={searchParams.service}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                disabled={!searchParams.department}
              >
                <option value="">Select a Service</option>
                {searchParams.department &&
                  departmentServices[searchParams.department].map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
              </select>
            </div>

            {/* Location Dropdown */}
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Location
              </label>
              <select
                id="location"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a Location</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Searching...
                </>
              ) : (
                "Search Services"
              )}
            </button>
          </div>
        </form>

        {/* Results Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-8">
          {error && <p className="text-red-500">{error}</p>}
          {data.length > 0 ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Results</h2>
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-indigo-100">
                  <tr>
                    <th className="px-4 py-2 border border-gray-300">Title</th>
                    <th className="px-4 py-2 border border-gray-300">Price</th>
                    <th className="px-4 py-2 border border-gray-300">Rating</th>
                    <th className="px-4 py-2 border border-gray-300">Source</th>
                    <th className="px-4 py-2 border border-gray-300">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((service, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border border-gray-300">{service.title}</td>
                      <td className="px-4 py-2 border border-gray-300">{service.price}</td>
                      <td className="px-4 py-2 border border-gray-300">{service.rating}</td>
                      <td className="px-4 py-2 border border-gray-300">{service.source}</td>
                      <td className="px-4 py-2 border border-gray-300">
                        <a
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 underline"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !loading && <p className="text-gray-600">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
