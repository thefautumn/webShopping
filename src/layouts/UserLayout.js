import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet /> {/* This is where the page content will be rendered */}
      </div>
      <Footer />
    </>
  );
};

export default UserLayout;
