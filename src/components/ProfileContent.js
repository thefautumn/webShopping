import React, { useEffect, useState } from 'react';
import Orders from './OrderHistory';
import AccountSettings from './AccountSetting';
import { getUserById } from '../services/userService'; // Import hàm getUserById

const ProfileContent = ({ activeSection, userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserById(userId);
        setUser(userData);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load user data');
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p className="text-red-500">{error}</p>;
    }

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
          </div>
        );
      case 'orders':
        return <Orders user={user} />;
      case 'accountSettings':
        return <AccountSettings userId={userId} />;
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
