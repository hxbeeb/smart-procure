import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Querypage from './components/pages/QueryPage';
import Specifications from './components/pages/Specifications'
// import AuthPage from './component/pages/AuthPage';
import './index.css';
import HomePage from './components/pages/HomePage';
import NameSearch from './components/pages/NameSearch';
import ServiceSearch from './components/pages/ServiceSearch';
import Navbar from './components/Navbar';
import PriceLineGraph from './components/pages/P4riceLineGraph';
import ProductPage from './components/pages/ProductPage';
import ProductPageTest from './components/pages/ProductPageTest'

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* <Sidebar /> */}
        <div className="flex-1">
        <Navbar />

          {/* <Navbar /> */}
          <Routes>
            {/* <Route path="/auth" element={<AuthPage />} /> */}
            <Route path="/" element={<HomePage />} />
            <Route path="/query" element={<Querypage/>}/>
            <Route path='/search/name' element={<NameSearch/>}/>
            <Route path="/search/specifications" element={<Specifications/>} />
            <Route path="/search/services" element={<ServiceSearch/>} />
            <Route path='/price-analysis' element={<PriceLineGraph/>}/>
             <Route path="/product/:productName" element={<ProductPage />} />
            <Route path="/producttest" element={<ProductPageTest/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
