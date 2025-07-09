// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';


// export default function Querypage() {
//   const [searchParams, setSearchParams] = useState({
//     itemName: '',
//     make: '',
//     model: '',
//     customSearch: '',
//   });

//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchParams((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const searchString = Object.values(searchParams)
//       .filter((value) => value)
//       .join(' ');

//     console.log('Search String:', searchString);

//     setLoading(true);
//     setError(null);
//     setData([]);

//     try {
//       const response = await axios.get(`http://localhost:5000/scrape`, {
//         params: { search: searchString },
//       });

//       console.log('Backend Response:', response.data);

//       // Use the response data directly, since it's already an array
//       const combinedData = response.data.map((item) => ({
//         ...item,
//         source: item.source || 'Unknown', 
//         price: item.price ? String(item.price).replace(/[^0-9.-]+/g, '') : null,// Optional: Add a default source if not present
//       }));

//       // setData(combinedData);
//       const sortedData = combinedData.sort((a, b) => {
//       const priceA = parseFloat(a.price) || Number.MAX_VALUE; // Set missing prices to a large value
//       const priceB = parseFloat(b.price) || Number.MAX_VALUE;
//       return priceA - priceB; // Ascending order
//     });

//     setData(sortedData);
//     } catch (err) {
//       setError(err.message || 'Error fetching data from the backend');
//     } finally {
//       setLoading(false);
//     }
//   };

 

// const getIframeLink = async (product) => {
//   try {
//     const response = await axios.get('http://localhost:5000/check-title', {
//       params: { title: product.title },
//     });

//     // Store the iframe link in sessionStorage
//     sessionStorage.setItem('iframeLink', response.data.iframe_link);

//     // Encode the product title before navigating
//     const encodedTitle = encodeURIComponent(product.title);

//     // Navigate to the product page
//     navigate(`/product/${encodedTitle}`);

//     alert('Price history request sent!');
//   } catch (error) {
//     console.error('Error sending price history request:', error);
//     alert('Error sending request.');
//   }
// };


// const exportToPDF = () => {
//   if (!data || data.length === 0) {
//     alert('No data available to export.');
//     return;
//   }

//   const doc = new jsPDF();

//   // Get the current date and time
//   const currentDate = new Date();
//   const formattedDate = currentDate.toLocaleString(); // Format the date and time (you can customize this format)

//   // Set document margins (top, left, right)
//   const margin = 10; // Adjust this value as needed

//   // Add the date and time at the top of the PDF
//   doc.setFontSize(12);
//   doc.text(`Exported on: ${formattedDate}`, margin, 15);

//   // Add a title to the PDF
//   doc.setFontSize(18);
//   doc.text('Product Search Results', margin, 25);

//   // Define the table columns
//   const tableColumn = ['Title', 'Price', 'Rating', 'Source', 'Link'];

//   // Define the table rows, ensuring all values are strings
//   const tableRows = data.map((product) => [
//     String(product.title || 'N/A'),
//     String(product.price || 'N/A'),
//     String(product.rating || 'N/A'),
//     String(product.source || 'Unknown'),
//     String(product.url || 'N/A'), // Links as plain text for now
//   ]);

//   // Add the table to the PDF with adjusted positioning and margins
//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 35, // Start below the title and date
//     theme: 'grid',
//     margin: { top: 35, left: margin, right: margin }, // Add margins to the left and right
//     columnStyles: {
//       0: { cellWidth: 50 }, // Title column width
//       1: { cellWidth: 30 }, // Price column width
//       2: { cellWidth: 30 }, // Rating column width
//       3: { cellWidth: 40 }, // Source column width
//       4: { cellWidth: 60 }, // Link column width
//     },
//     styles: { 
//       overflow: 'linebreak', 
//       fontSize: 10,
//       cellPadding: 3, // Padding inside cells to avoid content touching edges
//     },
//     didDrawCell: (data) => {
//       // Add clickable links for the "Link" column
//       if (data.column.index === 4 && typeof data.cell.raw === 'string') {
//         doc.link(
//           data.cell.x,
//           data.cell.y,
//           data.cell.width,
//           data.cell.height,
//           { url: data.cell.raw }
//         );
//       }
//     },
//   });

//   // Save the PDF
//   doc.save('Product_Search_Results.pdf');
// };


//   // Sample data for dropdowns
//   const itemNames = ['Laptop', 'Smartphone', 'Tablet', 'Desktop', 'Camera'];
//   const makes = ['Apple', 'Samsung', 'Dell', 'HP', 'Lenovo', 'Asus'];
//   const models = ['tuf', 'XPS15', 'Model A', 'Model B', 'Model C', 'Model D', 'Model E'];

// return (
//   <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//         Advanced Product Search
//       </h1>
//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
//           {[{ name: 'itemName', label: 'Item Name', options: itemNames },
//             { name: 'make', label: 'Make', options: makes },
//             { name: 'model', label: 'Model', options: models }].map((field) => (
//             <div key={field.name}>
//               <label
//                 htmlFor={field.name}
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 {field.label}
//               </label>
//               <select
//                 id={field.name}
//                 name={field.name}
//                 value={searchParams[field.name]}
//                 onChange={handleInputChange}
//                 className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
//               >
//                 <option value="">Select {field.label}</option>
//                 {field.options.map((option) => (
//                   <option key={option} value={option}>
//                     {option}
//                   </option>
//                 ))}
//                 <option value="custom">Custom</option>
//               </select>
//             </div>
//           ))}
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="customSearch"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Custom Search
//           </label>
//           <input
//             type="text"
//             id="customSearch"
//             name="customSearch"
//             value={searchParams.customSearch}
//             onChange={handleInputChange}
//             placeholder="Enter custom search terms..."
//             className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//           />
//         </div>
//         <div className="flex justify-center">
//           <button
//             type="submit"
//             className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <svg
//                   className="animate-spin h-5 w-5 text-white mr-2"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                 >
//                   <circle
//                     className="opacity-25"
//                     cx="12"
//                     cy="12"
//                     r="10"
//                     stroke="currentColor"
//                     strokeWidth="4"
//                   ></circle>
//                   <path
//                     className="opacity-75"
//                     fill="currentColor"
//                     d="M4 12a8 8 0 018-8v8H4z"
//                   ></path>
//                 </svg>
//                 Searching...
//               </>
//             ) : (
//               'Search Products'
//             )}
//           </button>
//         </div>
//       </form>
//       <div className="mt-8 bg-white shadow-md rounded-lg p-8">
//         {error && <p className="text-red-500">{error}</p>}
//         {data.length > 0 ? (
//           <div>
//             {/* Display the product with the lowest price */}
//             <p className="text-lg font-semibold text-gray-900 mb-4">
//               The product with the lowest price is: <strong>{data[0].title}</strong> at <strong>{data[0].price}</strong>
//             </p>

//             <h2 className="text-xl font-semibold text-gray-900 mb-4">Search Results</h2>
//             <table className="table-auto w-full border-collapse border border-gray-300">
//               <thead className="bg-indigo-100">
//                 <tr>
//                   <th className="px-4 py-2 border border-gray-300">Title</th>
//                   <th className="px-4 py-2 border border-gray-300">Price</th>
//                   <th className="px-4 py-2 border border-gray-300">Rating</th>
//                   <th className="px-4 py-2 border border-gray-300">Source</th>
//                   <th className="px-4 py-2 border border-gray-300">Link</th>
//                   {/* <th className="px-4 py-2 border border-gray-300">Purchase</th> */}
//                   <th className="px-4 py-2 border border-gray-300">View Price History</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((product, index) => (
//                   <tr key={index}>
//                     <td className="px-4 py-2 border border-gray-300">{product.title}</td>
//                     <td className="px-4 py-2 border border-gray-300">{product.price}</td>
//                     <td className="px-4 py-2 border border-gray-300">{product.rating}</td>
//                     <td className="px-4 py-2 border border-gray-300">{product.source}</td>
//                     <td className="px-4 py-2 border border-gray-300">
//                       <a
//                         href={product.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-indigo-600 underline"
//                       >
//                         View
//                       </a>
//                     </td>
//                     {/* <td className="px-4 py-2 border border-gray-300">
//                       <button
//                         onClick={() => handlePurchase(product)}
//                         className="px-4 py-2 bg-green-500 text-white rounded-md"
//                       >
//                         Purchase
//                       </button>
//                     </td> */}
//                     <td className="px-4 py-2 border border-gray-300">
//                       <button
//                         onClick={() => getIframeLink(product)}
//                         className="px-4 py-2 bg-blue-500 text-white rounded-md"
//                       >
//                         View Price Trend
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           !loading && <p className="text-gray-600">No results found.</p>
//         )}
//         {data.length > 0 && (
//           <div className="flex justify-end mt-4">
//             <button
//               onClick={exportToPDF}
//               className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
//             >
//               Export to PDF
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   </div>
// );
// }






























import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function AdvancedProductSearch() {
  const [searchParams, setSearchParams] = useState({
    itemName: '',
    make: '',
    model: '',
    ramVariants: []
  });

  const [items] = useState(['Laptop', 'Smartphone', 'Tablet', 'Desktop', 'Camera']);
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [ramVariants, setRamVariants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    
    // Reset subsequent dropdowns when earlier selection changes
    const updatedParams = { ...searchParams, [name]: value };
    if (name === 'itemName') {
      updatedParams.make = '';
      updatedParams.model = '';
      updatedParams.ramVariants = [];
    } else if (name === 'make') {
      updatedParams.model = '';
      updatedParams.ramVariants = [];
    }

    setSearchParams(updatedParams);
    setError(null);

    if (name === 'itemName' && value) {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/get-companies', {
          params: { item: value },
        });

        const fetchedCompanies = response.data.split('\n')
          .map((item) => item.trim())
          .filter((model) => model !== '');
        
        setMakes([...new Set(fetchedCompanies)]);
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to fetch companies. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (name === 'make' && value) {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/get-models', {
          params: { itemName: searchParams.itemName, make: value },
        });
        
        const modelsList = response.data.split('\n')
          .map((model) => model.trim())
          .filter((model) => model !== '');
          
        const cleanedModelsList = modelsList.map(item => item.replace('*', ''));
        setModels([...new Set(cleanedModelsList)]);
      } catch (err) {
        console.error('Error fetching models:', err);
        setError('Failed to fetch models. Please try again.');
      } finally {
        setLoading(false);
      }
    }

    if (name === 'model' && value) {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/get-ram-variants', {
          params: { 
            itemName: searchParams.itemName, 
            make: searchParams.make, 
            model: value 
          },
        });
    
        const ramList = response.data.split('\n')
          .map((ram) => ram.trim())
          .filter((ram) => ram !== '');
        
        setRamVariants([...new Set(ramList)]);
      } catch (err) {
        console.error('Error fetching RAM variants:', err);
        setError('Failed to fetch RAM variants. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleRamVariantChange = (ram) => {
    const currentRamVariants = searchParams.ramVariants;
    const newRamVariants = currentRamVariants.includes(ram)
      ? currentRamVariants.filter(r => r !== ram)
      : [...currentRamVariants, ram];
    
    setSearchParams(prev => ({
      ...prev,
      ramVariants: newRamVariants
    }));
  };

  const handlePurchase = async (product) => {
    try {
      console.log('Sending purchase data:', {
            title: product.title,
            price: product.price,
            link: product.url
        });
      const response = await axios.post('http://localhost:5001/save-purchase', {
        title: product.title,
        price: product.price,
        link: product.url,
      });

      if (response.data.success) {
        alert('Product saved for future benchmarking!');
      } else {
        alert('Error saving product data.');
      }
    } catch (error) {
      console.error('Error saving purchase:', error);
      alert('Error saving purchase.');
    }
  };
  const getIframeLink = async (product) => {
    try {
      const response = await axios.get('http://localhost:5001/check-title', {
        params: { title: product.title },
      });
  
      // Store the iframe link in sessionStorage
      sessionStorage.setItem('iframeLink', response.data.iframe_link);
  
      // Encode the product title before navigating
      const encodedTitle = encodeURIComponent(product.title);
  
      // Navigate to the product page
      navigate(`/product/${encodedTitle}`);
  
      // alert('Price history request sent!');
    } catch (error) {
      console.error('Error sending price history request:', error);
      alert('Error sending request.');
    }
  };
  

  const exportToPDF = () => {
  if (!data || data.length === 0) {
    alert('No data available to export.');
    return;
  }

  
  const doc = new jsPDF();

  // Get the current date and time
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString(); // Format the date and time (you can customize this format)

  // Set document margins (top, left, right)
  const margin = 10; // Adjust this value as needed

  // Add the date and time at the top of the PDF
  doc.setFontSize(12);
  doc.text(`Exported on: ${formattedDate}`, margin, 15);

  // Add a title to the PDF
  doc.setFontSize(18);
  doc.text('Product Search Results', margin, 25);

  // Define the table columns
  const tableColumn = ['Title', 'Price', 'Rating', 'Source', 'Link'];

  // Define the table rows, ensuring all values are strings
  const tableRows = data.map((product) => [
    String(product.title || 'N/A'),
    String(product.price || 'N/A'),
    String(product.rating || 'N/A'),
    String(product.source || 'Unknown'),
    String(product.url || 'N/A'), // Links as plain text for now
  ]);

  // Add the table to the PDF with adjusted positioning and margins
  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 35, // Start below the title and date
    theme: 'grid',
    margin: { top: 35, left: margin, right: margin }, // Add margins to the left and right
    columnStyles: {
      0: { cellWidth: 50 }, // Title column width
      1: { cellWidth: 30 }, // Price column width
      2: { cellWidth: 30 }, // Rating column width
      3: { cellWidth: 40 }, // Source column width
      4: { cellWidth: 60 }, // Link column width
    },
    styles: { 
      overflow: 'linebreak', 
      fontSize: 10,
      cellPadding: 3, // Padding inside cells to avoid content touching edges
    },
    didDrawCell: (data) => {
      // Add clickable links for the "Link" column
      if (data.column.index === 4 && typeof data.cell.raw === 'string') {
        doc.link(
          data.cell.x,
          data.cell.y,
          data.cell.width,
          data.cell.height,
          { url: data.cell.raw }
        );
      }
    },
  });

  // Save the PDF
  doc.save('Product_Search_Results.pdf');
};

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const searchString = Object.values(searchParams)
        .filter((value) => value)
        .join(' ');
  
      console.log('Search String:', searchString);
  
      setLoading(true);
      setError(null);
      setData([]);
  
      try {
        const response = await axios.get(`http://localhost:5001/scrape`, {
          params: { search: searchString },
        });
  
        console.log('Backend Response:', response.data);
  
        // Use the response data directly, since it's already an array
        const combinedData = response.data.map((item) => ({
          ...item,
          source: item.source || 'Unknown', // Optional: Add a default source if not present
        }));
  
        setData(combinedData);
      } catch (err) {
        setError(err.message || 'Error fetching data from the backend');
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex flex-col py-10 px-2 sm:px-6 lg:px-8 pt-28">
      <div className="max-w-5xl mx-auto w-full">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-blue-100">
          <div className="bg-blue-900 text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-2">Government Product Search Portal</h2>
            <p className="text-base text-blue-200">Comprehensive Product Lookup System</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Category Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  name="itemName"
                  value={searchParams.itemName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {items.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Make Dropdown */}
              {makes.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Manufacturer
                  </label>
                  <select
                    name="make"
                    value={searchParams.make}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Manufacturer</option>
                    {makes.map((make) => (
                      <option key={make} value={make}>{make}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Model Dropdown */}
              {models.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Model
                  </label>
                  <select
                    name="model"
                    value={searchParams.model}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* RAM Variants */}
            {ramVariants.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">
                  Specifications
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {ramVariants.map((ram) => (
                    <label 
                      key={ram} 
                      className="inline-flex items-center bg-gray-100 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        className="form-checkbox h-4 w-4 text-blue-600 mr-2"
                        checked={searchParams.ramVariants.includes(ram)}
                        onChange={() => handleRamVariantChange(ram)}
                      />
                      <span className="text-sm text-gray-700">{ram}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Error and Loading Handling */}
            {error && (
              <div className="bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded relative" role="alert">
                {error}
              </div>
            )}

            {/* Search Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleSubmit}
                type="submit"
                disabled={loading || !searchParams.model}
                className="w-full md:w-1/2 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold shadow-md"
              >
                {loading ? 'Searching...' : 'Search Products'}
              </button>
            </div>
          </form>

          {/* Search Results */}
          <div className="mt-12 bg-white shadow-inner rounded-xl p-8 border-t border-blue-100">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            {data.length > 0 ? (
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Search Results</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead className="bg-indigo-100">
                    <tr>
                      <th className="px-4 py-2 border border-gray-300">Title</th>
                      <th className="px-4 py-2 border border-gray-300">Price</th>
                      <th className="px-4 py-2 border border-gray-300">Rating</th>
                      <th className="px-4 py-2 border border-gray-300">Source</th>
                      <th className="px-4 py-2 border border-gray-300">Link</th>
                      <th className="px-4 py-2 border border-gray-300">View Price History</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((product, index) => (
                      <tr key={index} className="hover:bg-blue-50">
                        <td className="px-4 py-2 border border-gray-300">{product.title}</td>
                        <td className="px-4 py-2 border border-gray-300">{product.price}</td>
                        <td className="px-4 py-2 border border-gray-300">{product.rating}</td>
                        <td className="px-4 py-2 border border-gray-300">{product.source}</td>
                        <td className="px-4 py-2 border border-gray-300">
                          <a
                            href={product.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 underline"
                          >
                            View
                          </a>
                        </td>
                        <td className="px-4 py-2 border border-gray-300">
                          <button
                            onClick={() => getIframeLink(product)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                          >
                            View Price Trend
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={exportToPDF}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                  >
                    Export to PDF
                  </button>
                </div>
              </div>
            ) : (
              !loading && <p className="text-gray-600 text-center">No results found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}