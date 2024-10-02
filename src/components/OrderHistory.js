import React, { useEffect, useState } from 'react';
import { deleteOrder, getUserOrders, initiatePaypalPayment, updateOrderStatus } from '../services/orderService';
import { useNavigate } from 'react-router-dom';
import ScrollToTopButton from './ScrollTopButton';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Orders = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const handlePayment = async (order) => {
    try {
      const paymentData = await initiatePaypalPayment(order._id, order.totalPrice);
      window.location.href = paymentData.url; // Redirect user to PayPal
    } catch (err) {
      toast.error('Failed to initiate payment');
    }
  };

  const handleCancelOrder = async (orderId) => {
    Swal.fire({
      title: 'Are you sure cancel the order?',
      text: 'Your order will be permanently deleted',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteOrder(orderId);
          toast.success('Order cancelled successfully');
          setOrders(orders.filter(order => order._id !== orderId));
          Swal.fire('Cancel success!', 'Order is canceled success.', 'success');
        } catch (error) {
          toast.error('Failed to cancel order');
        }
      }
    });
  };

  // Cập nhật trạng thái order sang Completed khi người dùng bấm Confirm
  const handleOrderToComplete = async (orderId) => {
    Swal.fire({
      title: 'Are you sure to mark this order as completed?',
      text: 'This action will mark the order as completed.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, complete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateOrderStatus(orderId, 'Completed'); // API call to update order status to 'Completed'
          setOrders(prevOrders => {
            return prevOrders.map(order => {
              if (order._id === orderId) {
                return { ...order, orderStatus: 'Completed' };
              }
              return order;
            });
          });
          toast.success('Order marked as Completed');
        } catch (error) {
          toast.error('Failed to update order status: ' + error.message);
        }
      }
    });
  };

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
                      <p className={`font-semibold ${order.orderStatus === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                        {order.orderStatus}
                      </p>
                      <p className="font-bold mt-2">{order.totalPrice.toLocaleString()} VND</p>

                      {/* Nút Thanh Toán cho đơn hàng Pending */}
                      {order.orderStatus === 'Pending' && (
                        <button 
                          className="bg-blue-500 text-white py-2 px-4 rounded mt-2 hover:bg-blue-700"
                          onClick={() => handlePayment(order)}
                        >
                          Pay
                        </button>
                      )}

                      {/* Nút Confirm cho trạng thái Delivered */}
                      {order.orderStatus === 'Delivered' && (
                        <button 
                          className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-700"
                          onClick={() => handleOrderToComplete(order._id)}
                        >
                          Confirm Complete
                        </button>
                      )}
                    </div>
                  </div>
                    {/* || order.orderStatus === 'Processing'  sau này tùy chỉnh xem sau Cancel*/}
                    {(order.orderStatus === 'Pending' ) && (
                      <button 
                        className="bg-red-500 text-white py-2 px-4 rounded mt-2 hover:bg-red-700"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        Cancel 
                     
                      </button>
                    )}
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
