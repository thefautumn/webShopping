import axiosInstance from '../axiosconfig';

export const createOrder = async (orderData) => {
    try {
        const response = await axiosInstance.post('/orders/create', orderData);
        return response.data;
    } catch (error) {
        console.error('Failed to create order:', error.message);
        throw error;
    }
};

// Hàm để khởi tạo thanh toán PayPal
export const initiatePaypalPayment = async (orderId, amount) => {
    try {
        const response = await axiosInstance.post('/payment/create-order', { orderId, amount });
        return response.data;
    } catch (error) {
        console.error('Failed to initiate PayPal payment:', error.message);
        throw error;
    }
};

// Hàm để hoàn tất thanh toán
export const completePayment = async (orderId, transactionId) => {
    try {
        const response = await axiosInstance.post('/orders/complete-payment', { orderId, transactionId });
        return response.data;
    } catch (error) {
        console.error('Failed to complete payment:', error.message);
        throw error;
    }
};
export const getUserOrders = async (userId) => {
    try {
      const response = await axiosInstance.get(`/orders/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user orders');
    }
  };
  