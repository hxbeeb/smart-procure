import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import QueryPage from './pages/QueryPage';
import Dashboard from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import Block from './components/Block';
import QueryMake from './pages/querymake';
import { AuthProvider } from './components/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';
import ProductPage from './pages/ProductPage';
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* <Sidebar /> */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<QueryPage />} />
            <Route path="/block" element={<Block />} />
            <Route path="/querymake" element={<QueryMake />} />
            <Route path="/product/:productName" element={<ProductPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
