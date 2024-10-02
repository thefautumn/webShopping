import React, { useState } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { updateOrderStatus } from '../../services/orderService';

const OrderCard = ({ firstName, userEmail, items, orderStatus, totalPrice, orderId, onStatusChange }) => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const nextItem = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevItem = () => {
    setCurrentItemIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleOnChangeStatusOrder = async () => {
    console.log('Order ID:', orderId);
     Swal.fire({
      title: 'Do you want to change to Delivered?',
      text: 'This order will be marked as Delivered.',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Update the order status to 'Delivered'
          await updateOrderStatus(orderId, 'Delivered');
 
          onStatusChange(orderId, 'Delivered');

          // Show success message
          Swal.fire('Changed Successfully!', 'Order status is now Delivered.', 'success');
        } catch (error) {
          console.error('Failed to change order status:', error);
          Swal.fire('Error!', 'Failed to change order status.', 'error');
        }
      }
    });
  };

  return (
    <div className="max-w-xs mx-auto bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header section for Product Name and Status */}
      <div className="flex justify-between items-center p-4">
        <h2 className="text-sm text-gray-500">{userEmail}</h2>
        <p className="text-xl font-semibold">{orderStatus}</p>
      </div>
      <div className="relative">
        {/* Nếu có hơn 1 item, hiển thị các nút điều hướng */}
        {items.length > 1 && (
          <div>
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
              onClick={prevItem}
            >
              <FaArrowLeft />
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-gray-600 px-3 py-1 rounded-full hover:bg-gray-300"
              onClick={nextItem}
            >
              <FaArrowRight />
            </button>
          </div>
        )}

        {/* Hiển thị thông tin sản phẩm hiện tại */}
        <div key={items[currentItemIndex]._id} className="text-center">
          <img
            src={Array.isArray(items[currentItemIndex].productId.imageUrl)
              ? items[currentItemIndex].productId.imageUrl[0]
              : items[currentItemIndex].productId.imageUrl}
            className="w-full h-80 object-cover mb-4"
            alt={items[currentItemIndex].productId.name}
          />
          <p className="font-semibold">{items[currentItemIndex].productId.name}</p>
          <p className="text-gray-500">
            Price: {items[currentItemIndex].productId.price.toLocaleString()} VND
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center p-4 border-t mt-4">
        <p className="text-lg font-bold text-gray-800">{totalPrice.toLocaleString()} VND</p>
        {/* <button
          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
          onClick={handleOnChangeStatusOrder}
        >
          Confirm
        </button> */}

        {orderStatus === 'Processing' && (
                        <button 
                          className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors duration-200"
                          onClick={handleOnChangeStatusOrder}
                        >
                          Confirm
       </button>
         )}
      </div>
    </div>
  );
};

export default OrderCard;
