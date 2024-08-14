// src/pages/Profile.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ProfileContent from '../components/ProfileContent';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');

  // Giả lập thông tin người dùng
  const user = {
    email: 'sopopro123@gmail.com',
    phone: '0866055852',
    firstName: 'Hoàng Nhân',
    lastName: 'Võ Phan',
    mobilePhone: '0866055852',
    address: 'Khu phố 3, Thị Trấn Bến Cầu, Huyện Bến Cầu, Thị trấn Bến Cầu, Huyện Bến Cầu, Tây Ninh',
    dob: '20/09/2003',
    gender: 'Male',
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white-100 mt-20">
      <div className="flex w-full max-w-6xl mt-10 pl-8">
        <Sidebar setActiveSection={setActiveSection} />
        <div className="flex-1 p-10 bg-gray-50 rounded-lg ml-8 mt-10 	">
          <ProfileContent activeSection={activeSection} user={user} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
