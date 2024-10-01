import axiosInstance from "../axiosconfig";


export const addFavorite = async (productId) => {
    try {
      const response = await axiosInstance.post('/favorites', { productId });
      return response.data;
    } catch (error) {
      console.error('Failed to add favorite:', error);
      throw new Error(error.response?.data?.message || 'Failed to add favorite');
    }
  };
  
  // Function to remove a product from favorites
  export const removeFavorite = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/favorites/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to remove favorite:', error);
      throw new Error(error.response?.data?.message || 'Failed to remove favorite');
    }
  };
  
  // Function to fetch all favorites for the current user
  export const getFavorites = async () => {
    try {
      const response = await axiosInstance.get('/favorites');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch favorites');
    }
  };