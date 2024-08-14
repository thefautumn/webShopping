// src/components/Sidebar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBox,
  faCog,
  faStar,
  faSignOutAlt,
  faComments,
  faEdit,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ setActiveSection }) => {
  const [active, setActive] = useState('profile');

  const handleSetActive = (section) => {
    setActive(section);
    setActiveSection(section);
  };

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: faUser },
    { id: 'accountSettings', label: 'Setting Account', icon: faCog },
    { id: 'orders', label: 'Order history', icon: faBox },
    { id: 'contact', label: 'Contact', icon: faComments },
    { id: 'reviews', label: 'Review history', icon: faStar },
    { id: 'changePassword', label: 'Change my password', icon: faEdit },
    { id: 'logout', label: 'Đăng xuất', icon: faSignOutAlt },
  ];

  return (
    <div className="w-64 p-4 bg-gray-50 mt-10 border-solid border-gray-300 rounded-lg shadow-sm">
      <h1 className="text-3xl font-bold py-5 text-center bg-white-100 rounded-t-lg">Membership</h1>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li
            key={item.id}
            className={`flex items-center p-3 text-lg cursor-pointer rounded-lg border-b border-gray-200 ${
              active === item.id ? 'text-red-500 bg-gray-100' : 'text-black'
            } ${index === menuItems.length - 1 ? 'border-b-0' : ''}`}
            onClick={() => handleSetActive(item.id)}
          >
            <FontAwesomeIcon icon={item.icon} className="mr-3" />
            {item.label}
            <span className="ml-auto">{'>'}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
