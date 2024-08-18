
import axiosInstance from '../axiosconfig';

// Get all products
export const getProducts = async () => {
  try {
    const response = await axiosInstance.get('/products');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    // Nếu error có response từ server, trả về error.response.data (chứa thông tin chi tiết lỗi từ server)
    if (error.response) {
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'Failed to fetch product');
    } else {
      // Nếu không có response (lỗi network hoặc lỗi không xác định), trả về error message.
      console.error('Error:', error.message || 'An unknown error occurred');
      throw new Error(error.message || 'An unknown error occurred');
    }
  }
};


// Create a new product
export const createProduct = async (productData) => {
  try {
    const response = await axiosInstance.post('/products', productData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Update an existing product
export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosInstance.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};  
