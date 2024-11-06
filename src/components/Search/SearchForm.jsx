import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search for a product or service..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 border w-full"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
    </form>
  );
};

export default SearchForm;
