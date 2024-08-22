import React, { useState, useEffect } from 'react';
import { getBillingInformation } from '../services/cartService';
import { createOrder, initiatePaypalPayment } from '../services/orderService'; // Import các service cần thiết
import { useNavigate } from 'react-router-dom'; // Để điều hướng sau khi thanh toán thành công hoặc thất bại
import provincesData from '../dist/tinh_tp.json'; // Import data for provinces
import districtsData from '../dist/quan_huyen.json'; // Import data for districts
import wardsData from '../dist/xa_phuong.json'; // Import data for wards

const CheckoutPage = () => {
  const [billingData, setBillingData] = useState(null);
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PayPal'); // Default payment method
  const navigate = useNavigate(); // Sử dụng để điều hướng sau khi thanh toán thành công

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const data = await getBillingInformation();
        const cartId = data._id;
        // Convert province, district, ward codes to names
        const provinceName = provincesData[data.userId.province]?.name_with_type || data.userId.province;
        const districtName = districtsData[data.userId.district]?.name_with_type || data.userId.district;
        const wardName = wardsData[data.userId.ward]?.name_with_type || data.userId.ward;

        // Update billingData with names instead of codes
        setBillingData({
          ...data,
          userId: {
            ...data.userId,
            province: provinceName,
            district: districtName,
            ward: wardName,
          },
          cartId: cartId 
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBillingData();
  }, []);

  const handleCheckout = async () => {

    try {
      const orderData = {
        userId: billingData.userId._id,
        items: billingData.items,
        totalPrice: billingData.totalPrice,
        shippingAddress: {
          name: `${billingData.userId.firstName} ${billingData.userId.lastName}`,
          phone: billingData.userId.phone,
          province: billingData.userId.province,
          district: billingData.userId.district,
          ward: billingData.userId.ward,
          detailedAddress: billingData.userId.detailedAddress,
        },
        paymentMethod: paymentMethod,
        cartId: billingData.cartId
      };
      console.log('CartId: '+ billingData.cartId)
      // Tạo order với paymentMethod
      const order = await createOrder(orderData, paymentMethod);  // Đảm bảo rằng paymentMethod được truyền vào
  
      // Store the orderId in localStorage
      localStorage.setItem('orderId', order._id);
  
      if (paymentMethod === 'PayPal') {
        const paymentData = await initiatePaypalPayment(order._id, order.totalPrice);
        window.location.href = paymentData.url; // Chuyển hướng người dùng tới PayPal
      } else {
        alert('Order created successfully with COD method!');
        navigate('/order-confirmation');
      }
    } catch (err) {
      console.error('Checkout failed:', err.message);
      setError('Checkout failed. Please try again.');
    }
  };
  
  
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
              <input
              type="email"
              value={billingData.userId.phone}
              className="w-full border p-2 rounded mb-4"
              readOnly
            />
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
          <div className="flex items-center justify-between mb-4">
            <p>Shipping</p>
            <p>15,000 VND</p>
          </div>
          <hr className="my-4" />
          <div className="flex items-center justify-between text-xl font-bold">
            <p>Total</p>
            <p>{(billingData.totalPrice + 15000).toLocaleString()} VND</p>
          </div>

          <div className="mt-4">
            <label className="font-semibold">Select Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full border p-2 rounded mt-2 mb-6"
            >
              <option value="PayPal">PayPal</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-md mt-6 hover:bg-blue-700"
            onClick={handleCheckout}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
