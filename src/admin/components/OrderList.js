import React from 'react';
import OrderCard from './OrderCard';

const OrderList = ({ orders,handleStatusChange}) => {
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {orders.map((order, index) => (
        <OrderCard
          key={index}
          orderId={order._id}   
          userEmail={order.userId.email}
          items={order.items}
          orderStatus={order.orderStatus}
          totalPrice={order.totalPrice}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};

export default OrderList;
