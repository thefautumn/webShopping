import React, { useEffect, useRef } from 'react';

const RegisterModal = ({ onClose, onLogin }) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div ref={modalRef} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative font-sans overflow-y-auto" style={{ maxHeight: '90vh' }}>
        <button onClick={onClose} className="absolute top-3 right-3 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-2">Become a Member</h2>
        <p className="text-sm mb-4 text-gray-700">Join to ensure you don't miss out on exclusive deals, discounts, and vouchers just for you.</p>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-sm font-bold text-gray-700 mb-1">Create a Password *</label>
            <input
              type="password"
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <span className="absolute right-2 top-8 text-sm font-semibold text-black-500 cursor-pointer">SHOW</span>
            <p className="text-xs text-gray-500 mt-1">8 characters | 1 lowercase letter | 1 uppercase letter | 1 number</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth *</label>
            <div className="flex space-x-2">
              <input type="text" placeholder="dd" maxLength="2" className="w-1/3 p-2 border border-gray-300 rounded text-center" />
              <input type="text" placeholder="mm" maxLength="2" className="w-1/3 p-2 border border-gray-300 rounded text-center" />
              <input type="text" placeholder="yyyy" maxLength="4" className="w-1/3 p-2 border border-gray-300 rounded text-center" />
            </div>
            <p className="text-xs text-gray-500 mt-1">We would like to send you a special gift on your birthday.</p>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold text-gray-700 mb-1">DO YOU WANT TO EARN REWARDS?</label>
            <div className="flex items-center">
              <input type="checkbox" id="reward-me" className="mr-2" />
              <label htmlFor="reward-me" className="text-sm">Yes, send me emails about offers, style updates, and special event invitations.</label>
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-6">
            <p>By selecting 'Become a Member', I agree to the <a href="#" className="underline">Terms and Conditions</a>.</p>
            <p>To enhance your shopping experience, your personal data will be protected as per our <a href="#" className="underline">Privacy Policy</a>.</p>
          </div>
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md text-center text-base font-bold">Become a Member</button>
        </form>
        <button onClick={onLogin} className="w-full border border-black text-black py-3 rounded-md mt-4 text-center text-base font-bold">Sign In</button>
      </div>
    </div>
  );
};

export default RegisterModal;
