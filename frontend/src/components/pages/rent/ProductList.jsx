import React from 'react';

export function ProductList({ category }) {
  // Function to generate a simple placeholder image
  const getPlaceholderImage = (item) => {
    // Use a simple placeholder image service
    return `https://placehold.co/800x600?text=${encodeURIComponent(item)}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.items.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
          >
            <img
              src={getPlaceholderImage(item)}
              alt={item}
              className="w-full h-48 object-cover bg-gray-200"
              onError={(e) => {
                e.target.src = 'https://placehold.co/800x600?text=No+Image';
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{item}</h3>
              <p className="text-gray-600 mt-2">Available for rent</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Request Rental
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;