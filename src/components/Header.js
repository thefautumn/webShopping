import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../constants/routes';
import LoginModal from './LoginModal'; // Import LoginModal component

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 overflow-x-auto" style={{ minWidth: '1024px' }}>
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold">
            <a href={ROUTES.HOME} className="font-sans">COZA STORE</a>
          </div>
          <nav className="flex space-x-6">
            <a href={ROUTES.SHOP} className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Shop</a>
            <a href={ROUTES.FEATURES} className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Features</a>
            <a href={ROUTES.ABOUT} className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">About</a>
            <a href={ROUTES.CONTACT} className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Contact</a>
          </nav>
        </div>
        <div className="flex items-center space-x-10">
          <a href={ROUTES.SEARCH} className="text-gray-800">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </a>
          <a href='#'className="text-gray-800 relative" onClick={openModal}>
            <FontAwesomeIcon icon={faUser} size="lg" />
          </a>
          <a href={ROUTES.CART} className="text-gray-800 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">2</span>
          </a>
          <a href={ROUTES.WISHLIST} className="text-gray-800 relative">
            <FontAwesomeIcon icon={faHeart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">0</span>
          </a>
        </div>
      </div>

      {isModalOpen && <LoginModal onClose={closeModal} />}
    </header>
  );
};

export default Header;
