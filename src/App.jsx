import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import QueryPage from './pages/QueryPage';
import Dashboard from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import Block from './components/Block';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* <Sidebar /> */}
        <div className="flex-1">
          {/* <Navbar /> */}
          <Routes>
          <Route path="/" element={<LoginPage/>} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<QueryPage />} />
            <Route path="/block" element={<Block />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
