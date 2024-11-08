// import React, { useState } from 'react';
// import Navbar from '../components/Navbar';
// import Sidebar from '../components/Sidebar';  // Adjust path as needed

// const QueryPage = () => {
//   const [data, setData] = useState({ products: [] });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

//   const handleSearchChange = (event) => {
//     setSearchQuery(event.target.value); // Update the search query as user types
//   };

//   const handleSearchClick = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       // Scrape data from the server
//       const searchUrl = `http://localhost:5000/scrape?search=${encodeURIComponent(searchQuery)}`;
//       const scrapeResponse = await fetch(searchUrl);
//       if (!scrapeResponse.ok) {
//         throw new Error('Failed to fetch scraped data');
//       }
//       const scrapeData = await scrapeResponse.json();

//       // Filter out "Shop on eBay" titles
//       const filteredData = scrapeData.products.filter((product) =>
//         !product.title.toLowerCase().includes('shop on ebay'.toLowerCase())
//       );

//       setData({ products: filteredData });
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearSearch = () => {
//     setSearchQuery('');  // Clear the search query
//     setData({ products: [] }); // Optionally clear the displayed products as well
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-gray-800 text-white">
//         <Sidebar />
//       </div>

//       <div className="flex-1 p-8 bg-gray-50">
//         {/* Navbar */}
//         <div className="sticky top-0 z-10">
//           <Navbar />
//         </div>

//         {/* Content starts after Navbar */}
//         <div className="mt-16"> {/* Adds margin to start the content after Navbar */}
//           <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Search Products</h1>

//           {/* Centered Search Box and Buttons */}
//           <div className="flex flex-col justify-center items-center mb-6">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder="Search Products"
//               className="border border-blue-300 rounded p-3 mb-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />

//             {/* Search Button */}
//             <button
//               onClick={handleSearchClick}
//               disabled={loading}
//               className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
//             >
//               {loading ? 'Searching...' : 'Search'}
//             </button>

//             {/* Clear Button */}
//             <button
//               onClick={handleClearSearch}
//               className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
//             >
//               Clear Search
//             </button>
//           </div>

//           {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

//           {/* Display data in tabular format */}
//           {data && Array.isArray(data.products) && data.products.length > 0 ? (
//             <table className="table-auto w-full border-collapse border border-gray-300 mt-8 bg-white shadow-md rounded-md">
//               <thead className="bg-blue-100">
//                 <tr>
//                   <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Product Name</th>
//                   <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Description</th>
//                   <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Price</th>
//                   <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Ratings</th>
//                   <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Link</th>
//                   <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Reviews</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.products.map((product, index) => (
//                   <tr key={index} className="hover:bg-blue-50">
//                     <td className="px-6 py-4 border border-gray-300">{product.title}</td>
//                     <td className="px-6 py-4 border border-gray-300">{product.description}</td>
//                     <td className="px-6 py-4 border border-gray-300">{product.price}</td>
//                     <td className="px-6 py-4 border border-gray-300">{product.ratings}</td>
//                     <td className="px-6 py-4 border border-gray-300">
//                       <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//                         View Product
//                       </a>
//                     </td>
//                     <td className="px-6 py-4 border border-gray-300">
//                       {/* Display reviews if available */}
//                       {product.reviews && product.reviews.length > 0 ? (
//                         <ul className="list-disc pl-4">
//                           {product.reviews.map((review, reviewIndex) => (
//                             <li key={reviewIndex}>
//                               <strong>Reviewer:</strong> {review.reviewer}<br />
//                               <strong>Rating:</strong> {review.rating}<br />
//                               <strong>Comment:</strong> {review.comment}
//                             </li>
//                           ))}
//                         </ul>
//                       ) : (
//                         <span>No reviews available</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className="mt-4 text-gray-600 text-center">No products available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QueryPage;































import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';  // Adjust path as needed

const QueryPage = () => {
  const [data, setData] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to hold the search query

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query as user types
  };

  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Scrape data first
      const searchUrl = `http://localhost:5000/scrape?search=${encodeURIComponent(searchQuery)}`;
      // const searchUrl = `https://smart-procure.onrender.com/scrape?search=${encodeURIComponent(searchQuery)}`;
      const scrapeResponse = await fetch(searchUrl);
      if (!scrapeResponse.ok) {
        throw new Error('Failed to fetch scraped data');
      }
      const scrapeData = await scrapeResponse.json();
      
      // Filter out the "Shop on eBay" title
      const filteredData = scrapeData.products.filter((product) =>
        !product.title.toLowerCase().includes('shop on ebay'.toLowerCase())
      );
  
      // If there is a search query, filter the data based on title or description
      if (searchQuery) {
        const searchFilteredData = filteredData.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setData({ products: searchFilteredData });
      } else {
        setData({ products: filteredData }); // No search query, just show filtered data
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');  // Clear the search query
    setData({ products: [] }); // Optionally clear the displayed products as well
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        {/* Navbar */}
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        {/* Content starts after Navbar */}
        <div className="mt-16"> {/* Adds margin to start the content after Navbar */}
          <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Search Products</h1>

          {/* Centered Search Box and Buttons */}
          <div className="flex flex-col justify-center items-center mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Products"
              className="border border-blue-300 rounded p-3 mb-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 mb-4"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
            
            {/* Clear Button */}
            {/* <button
              onClick={handleClearSearch}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Clear Search
            </button> */}
          </div>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {/* Display data in tabular format */}
          {data && Array.isArray(data.products) && data.products.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-300 mt-8 bg-white shadow-md rounded-md">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Product Name</th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Description</th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Price</th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Ratings</th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Link</th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">Reliability</th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-6 py-4 border border-gray-300">{product.title}</td>
                    <td className="px-6 py-4 border border-gray-300">{product.description}</td>
                    <td className="px-6 py-4 border border-gray-300">{product.price}</td>
                    <td className="px-6 py-4 border border-gray-300">{product.ratings}</td>
                    <td className="px-6 py-4 border border-gray-300">
                      <a href={product.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        View Product
                      </a>
                    </td>
                    <td className="px-6 py-4 border border-gray-300">{product.reliability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="mt-4 text-gray-600 text-center">No products available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryPage;