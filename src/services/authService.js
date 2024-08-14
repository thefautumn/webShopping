import axiosInstance from '../axiosconfig';

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axiosInstance.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const recoverPassword = async (email) => {
  try {
    const response = await axiosInstance.post('/auth/recover', { email });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const resetPassword = async (resetData) => {
  try {
    const response = await axiosInstance.post('/auth/reset', resetData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
