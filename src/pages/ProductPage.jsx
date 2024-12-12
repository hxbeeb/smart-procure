import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productName } = useParams();
  
  // Decode the product name
  const decodedProductName = decodeURIComponent(productName);

  const [iframeLink, setIframeLink] = useState('');

  useEffect(() => {
    const link = sessionStorage.getItem('iframeLink');
    if (link) {
      setIframeLink(link);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Price History for {decodedProductName}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Price History</h2>
          {iframeLink ? (
            <iframe
              src={iframeLink}
              width="100%"
              height="500"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
              title="Price History Chart"
            ></iframe>
          ) : (
            <p>Loading price history...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;