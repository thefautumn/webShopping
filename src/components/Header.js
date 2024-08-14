import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../constants/routes';
import LoginModal from './LoginModal';  
import RegisterModal from './RegisterModal';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Trạng thái cho thanh tìm kiếm

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 overflow-x-auto" style={{ minWidth: '1024px' }}>
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="flex items-center space-x-8">
          <div className="text-3xl  font-bold">
            <a href={ROUTES.HOME} className="font-serif"> N&A </a>
          </div>
          <nav className="flex space-x-6">
            <a href={ROUTES.SHOP} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">SHOP</a>
            <a href={ROUTES.MALE} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">MEN</a>
            <a href={ROUTES.FEMALE} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">WOMEN</a>
            {/* <a href={ROUTES.CONTACT} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">Contact</a> */}
          </nav>
        </div>
        <div className="flex items-center space-x-10">
          <button onClick={toggleSearch} className="text-gray-800 relative focus:outline-none">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
          <button onClick={openLoginModal} className="text-gray-800 relative focus:outline-none">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>
          <a href={ROUTES.CART} className="text-gray-800 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">2</span>
          </a>
          <a href={ROUTES.FAVORITE} className="text-gray-800 relative">
            <FontAwesomeIcon icon={faHeart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">0</span>
          </a>
        </div>
      </div>

      {/* Hiển thị thanh tìm kiếm */}
      {isSearchOpen && (
        <div className="container mx-auto px-4 py-2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search..."
          />
        </div>
      )}

      {isLoginOpen && <LoginModal onClose={closeModals} onRegister={openRegisterModal} />}
      {isRegisterOpen && <RegisterModal onClose={closeModals} onLogin={openLoginModal} />}
    </header>
  );
};

export default Header;
