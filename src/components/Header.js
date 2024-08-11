import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold">
            <a href="/" className="font-sans">COZA STORE</a>
          </div>
          <nav className="flex space-x-6">
            <a href="/" className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Home</a>
            <a href="/shop" className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Shop</a>
            <a href="/features" className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Features</a>
            <a href="/blog" className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Blog</a>
            <a href="/about" className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">About</a>
            <a href="/contact" className="text-xl text-gray-800 font-sans font-medium hover:text-gray-600">Contact</a>
          </nav>
        </div>
        <div className="flex items-center space-x-10">
          <a href="/search" className="text-gray-800">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </a>
          <a href="/cart" className="text-gray-800 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">2</span>
          </a>
          <a href="/wishlist" className="text-gray-800 relative">
            <FontAwesomeIcon icon={faHeart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">0</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
