
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

// Get product by ID
export const getProductById = async (id) => {
  try {
    const response = await axiosInstance.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
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
