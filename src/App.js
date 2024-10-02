// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout';
import Home from './pages/Home';
import ShopPage from './pages/Shop'; 
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import FavoritePage from './pages/Favorite';
import Profile from './pages/Profile';
import CheckoutPage from './pages/Checkout';
import AdminDashboard from './admin/pages/Dashboard';
import AdminLayout from './admin/components/AdminLayout';
import PaymentSuccess from './components/PaymentSuccess';
import { FavoritesProvider } from './context/FavoritesContext';
import { ROUTES } from './constants/routes';
import ProductManagement from './admin/pages/ProductManagement';
import CreateProduct from './admin/pages/CreateProduct';
import { CartProvider } from './context/CartContext';
import ProductListByCategory from './components/ProductListByCategory';
import { isTokenExpired, removeToken } from './utils/auth'; // Import the utility functions
import OrderManagement from './admin/pages/OrderManagement';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  useEffect(() => {
    // Check token expiration on app load
    if (isTokenExpired()) {
      removeToken();  
    }
  }, []);

  return (
    <CartProvider>  
      <FavoritesProvider>
      <ErrorBoundary fallback={<p>Something went wrong</p>}>
        <Router>
          <Routes>
            {/* User routes */}
            <Route element={<UserLayout />}>
              <Route path={ROUTES.HOME} element={<Home />} />
              <Route path={ROUTES.SHOP} element={<ShopPage />} />
             
              <Route path={`${ROUTES.PRODUCTDETAIL}/:id`} element={<ProductDetail />} />
              <Route path={ROUTES.PROFILE} element={<Profile />} />
   
            
              <Route path={ROUTES.CART} element={<CartPage />} />
              <Route path={ROUTES.FAVORITE} element={<FavoritePage />} />
              <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
              <Route path={ROUTES.SUCCESS} element={<PaymentSuccess />} />
              <Route path={`${ROUTES.PRODUCT}/${ROUTES.CATEGORY}/:categoryName`} element={<ProductListByCategory />} />
            </Route>

            {/* Admin routes */}
            <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<AdminDashboard />} />
              <Route path={ROUTES.USERMANAGEMENT} element={<AdminDashboard />} />
              <Route path={ROUTES.CATEGORIES} element={<AdminDashboard />} />
              <Route path={ROUTES.PRODUCTS} element={<ProductManagement />} />
              <Route path={ROUTES.ORDERS} element={<OrderManagement />} />
              <Route path={`${ROUTES.PRODUCTS}/${ROUTES.CREATEPRODUCTS}`} element={<CreateProduct />} />
            </Route>
          </Routes>
        </Router>
        </ErrorBoundary>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
