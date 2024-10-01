import axios from 'axios';
import { isTokenExpired,removeToken} from './utils/auth';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
     const skipAuthRoutes = ['/login', '/products'];  
    if (skipAuthRoutes.some((route) => config.url.includes(route))) {
      return config;
    }

    // Kiểm tra token đã hết hạn chưa
    if (isTokenExpired()) {
      console.warn('Token expired. Redirecting to login.');
      removeToken();
     }

    // Thêm token vào headers nếu tồn tại
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor phản hồi để xử lý lỗi token toàn cục
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Token expired') {
      console.error('Token has expired');
      // Xử lý khi token hết hạn, ví dụ như chuyển hướng đến trang đăng nhập
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
