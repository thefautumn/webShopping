// src/services/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // URL cơ sở cho tất cả các yêu cầu API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor để thêm token vào header
 axiosInstance.interceptors.request.use(
    config => {
      // Lấy token từ localStorage (nếu tồn tại)
      const token = localStorage.getItem('token');
  
      // Nếu token tồn tại, thêm nó vào header Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    error => {
      // Xử lý lỗi trước khi request được gửi đi
      return Promise.reject(error);
    }
  );
  

// Response Interceptor để xử lý phản hồi từ server
axiosInstance.interceptors.response.use(
  response => {
    // Xử lý phản hồi thành công
    return response;
  },
  error => {
    // Xử lý lỗi toàn cục (ví dụ: thông báo lỗi cho người dùng)
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;
