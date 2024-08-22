import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { completePayment } from '../services/orderService';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const processPayment = async () => {
      try {
        const query = new URLSearchParams(location.search);
        const token = query.get('token');
        const PayerID = query.get('PayerID');
        const orderId = localStorage.getItem('orderId');

        // Log parameters for debugging
        console.log('Token:', token);
        console.log('PayerID:', PayerID);
        console.log('OrderID:', orderId);

        if (!token || !PayerID || !orderId) {
          throw new Error('Missing token, PayerID, or orderId');
        }

        // Call completePayment with the extracted parameters
        await completePayment(orderId, token, PayerID);

        alert('Payment successful!');
        navigate('/order-confirmation'); // Redirect to order confirmation page
      } catch (err) {
        console.error('Payment failed:', err.message);
        alert('Payment failed. Please try again.');
      }
    };

    processPayment();
  }, [location, navigate]);

  return <div>Processing payment...</div>;
};

export default PaymentSuccess;
