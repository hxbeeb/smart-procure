import React, { useState } from 'react';
import axios from 'axios';

export default function AdvancedProductSearch() {
  const [searchParams, setSearchParams] = useState({
    itemName: '',
    itemType: '',
    specifications: [],
  });

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e, index, field) => {
    const { value } = e.target;
    const updatedSpecifications = [...searchParams.specifications];
    updatedSpecifications[index] = {
      ...updatedSpecifications[index],
      [field]: value,
    };
    setSearchParams((prev) => ({
      ...prev,
      specifications: updatedSpecifications,
    }));
  };

  const handleAddSpecification = () => {
    setSearchParams((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }],
    }));
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = searchParams.specifications.filter(
      (spec, specIndex) => specIndex !== index
    );
    setSearchParams((prev) => ({
      ...prev,
      specifications: updatedSpecifications,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   // Start building the search string with itemName and itemType
  //   let searchString = `${searchParams.itemName}+${searchParams.itemType}`;

  //   // Flatten specifications and add them to searchString
  //   searchParams.specifications.forEach((spec) => {
  //     if (spec.key && spec.value) {
  //       searchString += `+${spec.key}+${spec.value}`;
  //     }
  //   });

  //   console.log('Search String:', searchString);

  //   setLoading(true);
  //   setError(null);
  //   setData([]);

  //   try {
  //     const response = await axios.get('http://localhost:5000/relaxed-scrape', {
  //       params: { search: searchString },
  //     });

  //     console.log('Backend Response:', response.data);

  //     const combinedData = response.data.map((item) => ({
  //       ...item,
  //       source: item.source || 'Unknown', // Optional: Add a default source if not present
  //     }));

  //     setData(combinedData);
  //   } catch (err) {
  //     setError(err.message || 'Error fetching data from the backend');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  // Start building the search string with itemName and itemType
  let searchString = `${searchParams.itemName} ${searchParams.itemType}`.trim();

  // Flatten specifications and add them to searchString, separated by spaces
  searchParams.specifications.forEach((spec) => {
    if (spec.key && spec.value) {
      searchString += ` ${spec.key} ${spec.value}`;
    }
  });

  console.log('Search String:', searchString);

  setLoading(true);
  setError(null);
  setData([]);

  try {
    const response = await axios.get('http://localhost:5001/service-scrape', {
      params: { search: searchString },
    });

    console.log('Backend Response:', response.data);

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

  // Sample data for dropdowns
  const itemTypes = ['Laptop', 'Smartphone', 'Tablet', 'Desktop', 'Camera'];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Advanced Product Search
        </h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
            <div>
              <label htmlFor="itemName" className="block text-sm font-medium text-gray-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={searchParams.itemName}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, itemName: e.target.value }))
                }
                placeholder="Enter item name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="itemType" className="block text-sm font-medium text-gray-700 mb-1">
                Item Type
              </label>
              <select
                id="itemType"
                name="itemType"
                value={searchParams.itemType}
                onChange={(e) =>
                  setSearchParams((prev) => ({ ...prev, itemType: e.target.value }))
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Item Type</option>
                {itemTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Specifications (e.g., RAM=16GB, Processor=i7)
            </label>
            {searchParams.specifications.map((spec, index) => (
              <div key={index} className="flex mb-3">
                <input
                  type="text"
                  name="specificationKey"
                  value={spec.key}
                  onChange={(e) => handleInputChange(e, index, 'key')}
                  placeholder="Specification Name (e.g., RAM)"
                  className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="text"
                  name="specificationValue"
                  value={spec.value}
                  onChange={(e) => handleInputChange(e, index, 'value')}
                  placeholder="Specification Value (e.g., 16GB)"
                  className="mt-1 block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpecification(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddSpecification}
              className="text-indigo-600 hover:text-indigo-800"
            >
              Add Specification
            </button>
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
                'Search Products'
              )}
            </button>
          </div>
        </form>

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
                  {data.map((product, index) => (
                    <tr key={index}>
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
