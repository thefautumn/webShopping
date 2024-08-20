import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './layouts/UserLayout'; // Layout cho user
import Home from './pages/Home';
import ShopPage from './pages/Shop'; 
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/Cart';
import FavoritePage from './pages/Favorite';
import Profile from './pages/Profile';
import BillingInformation from './pages/BillingInformation';
import AdminDashboard from './admin/pages/Dashboard'; // ví dụ admin dashboard
import AdminLayout from './admin/components/AdminLayout'; // layout cho admin

import { ROUTES } from './constants/routes'; // Make sure the path is correct
import ProductManagement from './admin/pages/ProductManagement';
import CreateProduct from './admin/pages/CreateProduct';
import { CartProvider } from './components/CartContext'; // Import the CartProvider
 
function App() {
  return (
    <CartProvider> {/* Wrap the entire app with CartProvider */}
      <Router>
        <Routes>
          {/* User routes */}
          <Route element={<UserLayout />}>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.SHOP} element={<ShopPage />} />
            <Route path={`${ROUTES.PRODUCTDETAIL}/:id`} element={<ProductDetail />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.FAVORITE} element={<FavoritePage />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.BILLING} element={<BillingInformation />} />

          </Route>

          {/* Admin routes */}
          <Route path={ROUTES.ADMIN} element={<AdminLayout />}>
            <Route path={ROUTES.DASHBOARD} element={<AdminDashboard />} />
            <Route path={ROUTES.USERMANAGEMENT} element={<AdminDashboard />} />
            <Route path={ROUTES.CATEGORIES} element={<AdminDashboard />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductManagement />} />
            <Route path={`${ROUTES.PRODUCTS}/${ROUTES.CREATEPRODUCTS}`} element={<CreateProduct />} /> {/* Ensure this route is correct */}
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
