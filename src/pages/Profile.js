import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProfileContent from '../components/ProfileContent';
import {jwtDecode} from 'jwt-decode';
import { ROUTES } from '../constants/routes'; // Đảm bảo rằng bạn đã định nghĩa ROUTES

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

  useEffect(() => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    } else {
      // Điều hướng về trang chủ nếu không có token
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  // Nếu không có userId (khi token không hợp lệ hoặc không có)
  if (!userId) {
    return null; // Hoặc có thể hiển thị một spinner/loading screen nếu muốn
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-white-100 mt-20">
      <div className="flex w-full max-w-6xl mt-10 pl-8">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 p-10 bg-white-50 rounded-lg ml-8 mt-10">
          <ProfileContent activeSection={activeSection} userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
