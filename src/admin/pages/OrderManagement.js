import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../services/orderService'; // Import API service
import OrderList from '../components/OrderList'; // Component để hiển thị đơn hàng

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const allOrders = await getAllOrders(); // Lấy tất cả đơn hàng từ API
        setOrders(allOrders);
        setLoading(false);
      } catch (err) {
        setError('Failed to load orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="ml-64 px-4 py-12 overflow-x-auto">
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
      <OrderList orders={orders}  handleStatusChange={handleStatusChange}/>  
    </div>
  );
};

export default OrderManagement;
