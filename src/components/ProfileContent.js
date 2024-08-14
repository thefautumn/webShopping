// src/components/ProfileContent.js
import React from 'react';
import Orders from './OrderHistory';
import AccountSettings from './AccountSetting';
// Import thêm các component khác nếu cần

const ProfileContent = ({ activeSection, user }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <h2 className="text-2xl font-bold ">Profile</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-bold">EMAIL ADDRESS</h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="font-bold">PHONE</h3>
                <p>{user.phone}</p>
              </div>
              <div>
                <h3 className="font-bold">NAME</h3>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div>
                <h3 className="font-bold">MOBILE PHONE</h3>
                <p>{user.mobilePhone}</p>
              </div>
              <div>
                <h3 className="font-bold">ADDRESS</h3>
                <p>{user.address}</p>
              </div>
              <div>
                <h3 className="font-bold">BIRTHDAY</h3>
                <p>{user.dob}</p>
              </div>
              <div>
                <h3 className="font-bold">GENDER</h3>
                <p>{user.gender}</p>
              </div>
            </div>
            <div className="mt-8">
              <h3 className="font-bold">MEMBERSHIP BARCODE</h3>
              <img src="/path/to/barcode.png" alt="Membership Barcode" className="mb-4"/>
              <button className="bg-black text-white py-2 px-4 rounded">PRINT BARCODE</button>
            </div>
          </div>
        );
      case 'orders':
        return <Orders />;
      case 'accountSettings':
        return <AccountSettings />;
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="p-8 bg-white shadow-md rounded-lg w-full">
      {renderContent()}
    </div>
  );
};

export default ProfileContent;
