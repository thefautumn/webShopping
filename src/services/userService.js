import axiosInstance from '../axiosconfig';
 

// Lấy thông tin người dùng dựa trên ID
export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`/users/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Lấy danh sách tất cả người dùng
export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get('/users');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Cập nhật thông tin người dùng
export const updateUserById = async (userId, updateData) => {
  try {
    const response = await axiosInstance.put(`/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Xóa người dùng
export const deleteUserById = async (userId) => {
  try {
    await axiosInstance.delete(`/users/${userId}`);
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
