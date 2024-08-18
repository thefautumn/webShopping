import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaProductHunt, FaUsers, FaHashtag } from 'react-icons/fa';
import { ROUTES } from '../../constants/routes';

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-white text-gray-800 fixed flex flex-col border-r border-gray-300"> 
      <div className="flex items-center justify-center h-14 border-b">
        <div className="text-xl font-semibold">Cummo</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
            </div>
          </li>
          <li>
            <Link to={ROUTES.DASHBOARD} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <FaHome className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to={ROUTES.PRODUCTS} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <FaProductHunt className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Product Management</span>
            </Link>
          </li>
          <li>
            <Link to={ROUTES.CATEGORIES} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <FaHashtag className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Category Management</span>
            </Link>
          </li>
          <li>
            <Link to={ROUTES.USERMANAGEMENT} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
              <span className="inline-flex justify-center items-center ml-4">
                <FaUsers className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">User Management</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
