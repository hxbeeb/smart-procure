// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';

const AdminPage = () => {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    // Fetch all user queries from the backend
    const fetchQueries = async () => {
      const response = await fetch('/api/admin/queries');
      const data = await response.json();
      setQueries(data);
    };
    fetchQueries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border-b px-4 py-2">Query</th>
            <th className="border-b px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {queries.map((query) => (
            <tr key={query.id}>
              <td className="border-b px-4 py-2">{query.product}</td>
              <td className="border-b px-4 py-2">{query.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
