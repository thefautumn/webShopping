import React, { useEffect, useRef, useState } from 'react';
import { loginUser } from '../services/authService'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';  

const LoginModal = ({ onClose, onRegister, onLoginSuccess }) => {
  const modalRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      localStorage.setItem('token', response.token); // Lưu token vào localStorage
      onLoginSuccess(); // Gọi hàm onLoginSuccess để cập nhật giao diện người dùng
      toast.success('Login successful!'); // Thông báo đăng nhập thành công
      onClose(); // Đóng modal sau khi đăng nhập thành công
    } catch (error) {
      toast.error(error.message || 'Login failed'); // Thông báo đăng nhập thất bại
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative font-sans">
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-2">Sign in</h2>
        <p className="text-center text-sm mb-4 text-gray-700">Become a member — don’t miss out on deals, offers, discounts and bonus vouchers.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-bold text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
           </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember-me" className="mr-2" />
              <label htmlFor="remember-me" className="text-sm">Remember Me</label>
            </div>
            <a href="#" className="text-sm underline text-black-500 hover:underline">Forgot password?</a>
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md text-center text-base font-bold">Sign in</button>
        </form>
        <button onClick={onRegister} className="w-full border border-black text-black py-3 rounded-md mt-4 text-center text-base font-bold">
          Become a member
        </button>
      </div>
      <ToastContainer /> {/* Thêm ToastContainer để hiển thị toast */}
    </div>
  );
};

export default LoginModal;
