import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import Navbar from '../components/Navbar'; // Import the Navbar component

const QueryPage = () => {
  const [productDetails, setProductDetails] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults([]); // Reset previous results

    try {
      // Simulate fetching data from APIs (mock data)
      const mockProcureData = [
        {
          name: "Product 1",
          vendor: "ProcureVendor",
          price: 1000,
          vendorReliability: "4.5/5",
          recommended: true,
        },
        {
          name: "Product 2",
          vendor: "ProcureVendor",
          price: 800,
          vendorReliability: "4.0/5",
          recommended: false,
        },
      ];

      const mockAmazonData = [
        {
          name: "Product 3",
          vendor: "AmazonVendor",
          price: 1200,
          vendorReliability: "4.7/5",
          recommended: true,
        },
        {
          name: "Product 4",
          vendor: "AmazonVendor",
          price: 1500,
          vendorReliability: "4.2/5",
          recommended: false,
        },
      ];

      // Combine mock data from multiple sources (Procure and Amazon)
      const combinedResults = [...mockProcureData, ...mockAmazonData];

      // Filter results based on the search term (case-insensitive match)
      const filteredResults = combinedResults.filter((item) =>
        item.name.toLowerCase().includes(productDetails.toLowerCase())
      );

      setResults(filteredResults);
    } catch (error) {
      console.error('Error fetching product data:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-64 p-8 w-full flex justify-center items-center">
          {/* Centered Box */}
          <div className="bg-white p-8 rounded-md shadow-md w-full max-w-4xl">
            <h2 className="text-2xl font-bold mb-6">Search Products/Services</h2>
            <form onSubmit={handleSearch} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Product/Service Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </form>

            <div className="mt-6">
              {loading && <p>Loading...</p>}

              {results.length > 0 ? (
                <table className="min-w-full table-auto mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-3 text-left">Product Name</th>
                      <th className="px-4 py-3 text-left">Vendor</th>
                      <th className="px-4 py-3 text-left">Price</th>
                      <th className="px-4 py-3 text-left">Vendor Reliability</th>
                      <th className="px-4 py-3 text-left">Recommended</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-3">{item.name}</td>
                        <td className="px-4 py-3">{item.vendor}</td>
                        <td className="px-4 py-3">₹{item.price}</td>
                        <td className="px-4 py-3">{item.vendorReliability}</td>
                        <td
                          className={`px-4 py-3 ${
                            item.recommended ? 'text-green-500' : 'text-red-500'
                          }`}
                        >
                          {item.recommended ? 'Recommended' : 'Not Recommended'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryPage;
