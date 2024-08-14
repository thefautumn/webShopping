import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHeart } from '@fortawesome/free-solid-svg-icons';

const CartPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      {/* Cart Items Section */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              <img src="https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/462750/item/goods_69_462750.jpg" alt="Product" className="w-24 h-24 object-cover mr-4"/>
              <div>
                <h2 className="text-xl font-semibold">Knitted Cardigan</h2>
                <p className="text-gray-600">Color: Olive Green | Size: S</p>
                <p className="text-gray-600">SKU: 1237776001</p>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHeart} className="text-gray-400 mr-4" />
              <select className="border border-gray-300 rounded p-2 text-gray-600">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
              <p className="text-xl font-semibold ml-4">₫499,000</p>
              <button className="ml-4 text-gray-400 hover:text-gray-600">
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
          </div>
          {/* Repeat this block for each cart item */}
        </div>

        {/* Summary Section */}
        <div className="lg:w-1/3 w-full bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>₫499,000</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Shipping</p>
            <p>₫49,000</p>
          </div>
          <hr className="my-4"/>
          <div className="flex justify-between text-xl font-bold">
            <p>Total</p>
            <p>₫548,000</p>
          </div>
          <button className="w-full bg-black text-white py-3 rounded-md mt-6">Proceed to Checkout</button>
          <div className="flex justify-center mt-4">
            <img src="/path/to/payment-methods.png" alt="Payment Methods" />
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-8 text-gray-600 text-sm">
        <p>Prices and shipping fees are not final until checkout.</p>
        <p>Free returns within 30 days. <a href="#" className="underline">Return policy</a>.</p>
      </div>
    </div>
  );
};

export default CartPage;
