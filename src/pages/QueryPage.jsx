import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const QueryPage = () => {
  const [data, setData] = useState({ products: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const searchUrl = `http://localhost:5000/scrape?search=${encodeURIComponent(
        searchQuery
      )}`;
      const scrapeResponse = await fetch(searchUrl);
      if (!scrapeResponse.ok) {
        throw new Error("Failed to fetch scraped data");
      }
      const scrapeData = await scrapeResponse.json();
      const filteredData = scrapeData.products.filter(
        (product) =>
          !product.title.toLowerCase().includes("shop on ebay".toLowerCase())
      );

      setData({ products: filteredData });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    handleImageSearch(file);
  };

  const handleImageSearch = async (file) => {
    if (!file) return;
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("http://localhost:5000/scrape-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch image search results");
      }

      const imageData = await response.json();
      const filteredData = imageData.products.filter(
        (product) =>
          !product.title.toLowerCase().includes("shop on ebay".toLowerCase())
      );

      setData({ products: filteredData });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setSelectedImage(null);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-800 text-white">
        <Sidebar />
      </div>

      <div className="flex-1 p-8 bg-gray-50">
        <div className="sticky top-0 z-10">
          <Navbar />
        </div>

        <div className="mt-16">
          <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
            Search Products
          </h1>

          {/* Search Box with Camera Icon */}
          <div className="flex flex-col items-center mb-6">
  <div className="relative w-80 shadow-lg rounded-full overflow-hidden">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchChange}
      placeholder="Search Products"
      className="w-full p-3 pl-12 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    {/* Camera Icon inside Search Box */}
    <div className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer">
      <i className="fas fa-camera text-gray-500"></i>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleImageUpload(e);
          if (searchQuery.trim() === "") handleImageSearch();
        }}
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  </div>

  {/* Search Button */}
  <button
    onClick={handleSearchClick}
    disabled={loading}
    className="mt-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-full hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
  >
    {loading ? "Searching..." : "Search"}
  </button>
</div>


          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

          {/* Display data in tabular format */}
          {data && Array.isArray(data.products) && data.products.length > 0 ? (
            <table className="table-auto w-full border-collapse border border-gray-300 mt-8 bg-white shadow-md rounded-md">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">
                    Product Name
                  </th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">
                    Description
                  </th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">
                    Price
                  </th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">
                    Ratings
                  </th>
                  <th className="px-6 py-4 border border-gray-300 text-left text-gray-700">
                    Link
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.products.map((product, index) => (
                  <tr key={index} className="hover:bg-blue-50">
                    <td className="px-6 py-4 border border-gray-300">
                      {product.title}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {product.description}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      {product.ratings}
                    </td>
                    <td className="px-6 py-4 border border-gray-300">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Product
                      </a>
                    </td>
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
