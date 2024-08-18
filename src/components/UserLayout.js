import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserLayout = ({ children }) => {
  return (
    <div className="UserLayout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
