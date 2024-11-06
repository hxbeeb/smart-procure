import React from 'react';

const SearchResults = ({ results }) => (
  <div className="mt-4">
    {results.map((item, index) => (
      <div key={index} className="p-4 border-b">
        <h3 className="font-bold">{item.name}</h3>
        <p>Price: {item.price}</p>
      </div>
    ))}
  </div>
);

export default SearchResults;
