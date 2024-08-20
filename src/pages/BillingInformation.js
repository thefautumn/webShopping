import React, { useState, useEffect } from 'react';
import { getBillingInformation } from '../services/cartService';

const BillingInformation = () => {
  const [billingData, setBillingData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const data = await getBillingInformation();
        setBillingData(data);
      } catch (err) {
        setError(err);
      }
    };

    fetchBillingData();
  }, []);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!billingData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Contact, Payment, and Shipping Information */}
        <div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Contact information</h2>
            <input
              type="email"
              value={billingData.userId.email}
              className="w-full border p-2 rounded mb-4"
              readOnly
            />
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Payment method</h2>
            {/* Add Payment Method Selection Here */}
            <select className="w-full border p-2 rounded mb-4">
              <option value="VNPay">VNPay</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Shipping address</h2>
            <input
              type="text"
              value={billingData.userId.province}
              placeholder="Province"
              className="w-full border p-2 rounded mb-4"
              readOnly
            />
            <input
              type="text"
              value={billingData.userId.district}
              placeholder="District"
              className="w-full border p-2 rounded mb-4"
              readOnly
            />
            <input
              type="text"
              value={billingData.userId.ward}
              placeholder="Ward"
              className="w-full border p-2 rounded mb-4"
              readOnly
            />
            <input
              type="text"
              value={billingData.userId.detailedAddress}
              placeholder="Detailed Address"
              className="w-full border p-2 rounded mb-4"
              readOnly
            />
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order summary</h2>
          {billingData.items.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-4">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 object-cover rounded mr-4"
              />
              <div className="flex-1">
                <p>{item.name}</p>
                <p className="text-gray-600 text-sm">Size: {item.size}</p>
              </div>
              <p>{item.price.toLocaleString()} VND</p>
            </div>
          ))}
          <div className="flex items-center justify-between mb-4">
            <p>Subtotal</p>
            <p>{billingData.totalPrice.toLocaleString()} VND</p>
          </div>
          {/* Add additional charges like shipping and taxes here */}
          <hr className="my-4" />
          <div className="flex items-center justify-between text-xl font-bold">
            <p>Total</p>
            <p>{(billingData.totalPrice + 15000).toLocaleString()} VND</p>
          </div>
          <button className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingInformation;
