// src/services/cartService.js
import axiosInstance from '../axiosconfig';

export const addToCart = async (userId, productId, quantity, size) => {
  try {
    const response = await axiosInstance.post('/cart/add-to-cart', {
      userId,
      productId,
      quantity,
      size,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.message || 'Failed to add item to cart';
  }
};

export const getCart = async () => {
    try {
      const response = await axiosInstance.get('/cart'); // Endpoint để lấy giỏ hàng
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Failed to fetch cart';
    }
  };

  export const updateCartItemQuantity = async (productId, size, quantity) => {
    try {
      const response = await axiosInstance.put(`/cart/update-quantity`, { productId, size, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to update cart item quantity';
    }
  };
  
  export const removeCartItem = async (productId, size) => {
    try {
      const response = await axiosInstance.delete(`/cart/remove-item`, { data: { productId, size } });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove cart item';
    }
  };

export const getBillingInformation = async () => {
  try {
    const response = await axiosInstance.get('/cart/billing-information');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to fetch billing information';
  }
};