import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

const FavoritePage = () => {
    const navigate = useNavigate();
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Favorites</h1>
      <p className="text-right text-sm mb-4">2 products</p>
      
      {/* Wishlist Items Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Wishlist Item */}
        <div className="flex flex-col items-center border p-4 rounded-lg shadow-md w-full max-w-xs mx-auto">
          <img src="https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F12%2Fef%2F12efe48833534c202cee87549315c134142ff9ef.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D" 
            alt="Product" className="w-full h-auto object-cover mb-4" />
          <div className="flex justify-between items-start w-full">
            <div>
              <h2 className="text-lg font-semibold">Regular Fit Utility Shirt</h2>
              <p className="text-gray-600 text-sm">₫799,000</p>
              <p className="text-gray-600 text-sm">New Arrival</p>
              <p className="text-gray-600 text-sm">Color: Beige</p>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
          <div className="mt-4 w-full">
            <select className="w-full border border-gray-300 p-2 rounded mb-4 text-sm">
              <option value="">Select Size</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
            </select>
            <button 
            className="w-full bg-black text-white py-2 rounded-md text-sm" 
            onClick={() => navigate(ROUTES.CART)}>
             Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritePage;
