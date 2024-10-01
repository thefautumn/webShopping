import React, { useEffect, useState } from 'react';
import { getUserOrders } from '../services/orderService';
import ScrollToTopButton from './ScrollTopButton'; // Import the floating button component

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getUserOrders(userId);
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order._id} className="border border-gray-300 rounded-lg p-4">
              <div className="flex">
                <div className="w-1/5">
                  <img 
                    src={order.items[0]?.productId.imageUrl} 
                    alt={order.items[0]?.productId.name} 
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="w-4/5 pl-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg">{order.items[0]?.productId.name}</p>
                      <p className="text-sm text-gray-500">Size: {order.items[0]?.size} &nbsp;&nbsp; Qty: {order.items[0]?.quantity}</p>
                      <p className="text-sm font-bold">Price: {order.items[0]?.price.toLocaleString()} VND</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${order.orderStatus === 'Delivered' ? 'text-green-600' : 'text-red-600'}`}>
                        {order.orderStatus}
                      </p>
                      <p className="font-bold mt-2">{order.totalPrice.toLocaleString()} VND</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      <ScrollToTopButton /> 
    </div>
  );
};

export default Orders;
