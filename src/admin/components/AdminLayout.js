import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './Sidebar'; // Sidebar dành cho admin
 
const AdminLayout = () => {
  return (
    <div className="admin-layout flex">
      <AdminSidebar />
      <div className="flex-1">
         <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
