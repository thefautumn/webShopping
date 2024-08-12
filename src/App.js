import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ShopPage from './pages/Shop'; 
import ProductDetail from './pages/ProductDetail';
import { ROUTES } from './constants/routes'; // Make sure the path is correct
import LoginModal from './components/LoginModal';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SHOP} element={<ShopPage />} />
          <Route path={ROUTES.PRODUCTDETAIL} element ={<ProductDetail/>} />
          {/* Add more routes here as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
