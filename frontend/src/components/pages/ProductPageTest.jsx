import React from 'react';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const { productName } = useParams();

  // Decode the product name
  const decodedProductName = decodeURIComponent(productName);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Price History for {decodedProductName}
        </h1>
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Price History</h2>
          <div className="relative">
            {/* Iframe */}
            <iframe
              src="https://pricehistoryapp.com/embed/asus-chromebook-celeron-dual-core-n4500-4-gb-64-gb-emmc-storage-chrome-os-cx1500cka-ej0241-thin-and-light-laptop"
              width="100%"
              height="500"
              frameBorder="0"
              allowTransparency="true"
              scrolling="no"
              title="Price History Chart"
              style={{
                zIndex: 1,
                position: "relative",
                filter: `
                  brightness(1.2) 
                  contrast(1.5) 
                  saturate(1.2) 
                  hue-rotate(270deg)`,
              }}
            ></iframe>

            {/* Overlay for fine-tuning the appearance */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: "white",
                mixBlendMode: "soft-light",
                opacity: 0.8,
                zIndex: 2,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
