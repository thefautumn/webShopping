import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../context/CartContext';
import { updateCartItemQuantity, removeCartItem } from '../services/cartService'; // Import API services
import { ROUTES } from '../constants/routes';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const CartPage = () => {
  const { cart, dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const handleRemoveItem = async (productId, size) => {
    try {
      await removeCartItem(productId, size);
      dispatch({ type: 'REMOVE_FROM_CART', payload: { productId, size } });
      toast.success('Item removed from cart.');
    } catch (error) {
      console.error('Failed to remove item from cart:', error.message);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleUpdateQuantity = async (productId, size, quantity) => {
    
    try {
      await updateCartItemQuantity(productId, size, quantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });

      toast.success('Cart updated.');
    } catch (error) {
      console.error('Failed to update cart item:', error.message);
      toast.error('Failed to update cart item.');
    }
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      toast.error('Please add items to your cart before proceeding to checkout.');
      return;
    }

    navigate(ROUTES.CHECKOUT);
  };

  const totalAmount = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {cart.items.length > 0 ? (
            cart.items.map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b pb-4 mb-4">
                <div className="flex items-center">
                  <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Product ID: {item.productId}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <select
                    className="border border-gray-300 rounded p-2 text-gray-600"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.productId, item.size, parseInt(e.target.value, 10))}
                  >
                    {[...Array(10).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                  <p className="text-xl font-semibold ml-4">{item.price.toLocaleString()} VND</p>
                  <button
                    className="ml-4 text-gray-400 hover:text-gray-600"
                    onClick={() => handleRemoveItem(item.productId, item.size)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Giỏ hàng của bạn trống.</p>
          )}
        </div>

        {/* Summary Section */}
        <div className="lg:w-1/3 w-full bg-gray-50 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <p>Subtotal</p>
            <p>{totalAmount.toLocaleString()} VND</p>
          </div>
          <div className="flex justify-between mb-2">
            <p>Shipping</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-xl font-bold">
            <p>Total</p>
            <p>{totalAmount.toLocaleString()} VND</p>
          </div>
          <button onClick={handleCheckout} className="w-full bg-black text-white py-3 rounded-md mt-6">Proceed to Checkout</button>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer to display toast messages */}
    </div>
  );
};

export default CartPage;
