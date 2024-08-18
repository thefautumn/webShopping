import React, { useState, useEffect } from 'react';
import { getUserById, updateUserById } from '../services/userService';
import provincesData from '../dist/tinh_tp.json';
import districtsData from '../dist/quan_huyen.json';
import wardsData from '../dist/xa_phuong.json';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AccountSetting = ({ userId }) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [ward, setWard] = useState('');
  const [detailedAddress, setDetailedAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [mobilePhone, setMobilePhone] = useState('');
  const [dob, setDob] = useState(null);
  const [gender, setGender] = useState('');
  const [message, setMessage] = useState('');

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(userId);
        setEmail(userData.email);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setProvince(userData.province);
        setDistrict(userData.district);
        setWard(userData.ward);
        setDetailedAddress(userData.detailedAddress);
        setPhone(userData.phone);
        setMobilePhone(userData.mobilePhone);
        setDob(userData.dob ? new Date(userData.dob) : null);
        setGender(userData.gender);
      } catch (error) {
        console.error('Failed to load user data:', error);
      }
    };

    setProvinces(Object.values(provincesData));

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (province) {
      const filteredDistricts = Object.values(districtsData).filter(
        (dist) => dist.parent_code === province
      );
      setDistricts(filteredDistricts);
    }
  }, [province]);

  useEffect(() => {
    if (district) {
      const filteredWards = Object.values(wardsData).filter(
        (ward) => ward.parent_code === district
      );
      setWards(filteredWards);
    }
  }, [district]);

  // Automatically update detailed address when province, district, or ward changes
  useEffect(() => {
    const selectedProvince = provinces.find((prov) => prov.code === province);
    const selectedDistrict = districts.find((dist) => dist.code === district);
    const selectedWard = wards.find((w) => w.code === ward);

    let address = '';
    if (selectedWard) address += `${selectedWard.name_with_type}, `;
    if (selectedDistrict) address += `${selectedDistrict.name_with_type}, `;
    if (selectedProvince) address += `${selectedProvince.name_with_type}`;

    setDetailedAddress(address);
  }, [province, district, ward, provinces, districts, wards]);

  const handleSaveChanges = async () => {
    const age = new Date().getFullYear() - (dob ? dob.getFullYear() : 0);
    if (age < 13) {
      setMessage('You must be at least 13 years old.');
      return;
    }

    const updateData = {
      firstName,
      lastName,
      province,
      district,
      ward,
      detailedAddress,
      phone,
      mobilePhone,
      dob: dob ? dob.toISOString().split('T')[0] : null, // Ensure the date is in correct format
      gender,
    };

    try {
      await updateUserById(userId, updateData);
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update user data:', error);
      setMessage('Failed to update profile');
    }
  };

  return (
    <div className="bg-white p-8 shadow-lg rounded-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">EDIT PROFILE</h2>
      <form className="space-y-6">
        <div className="flex flex-col">
          <label className="font-semibold">EMAIL ADDRESS*</label>
          <input
            type="email"
            value={email}
            readOnly
            className="border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>
        <div className="flex flex-col">
          <label className="font-semibold">FIRST NAME*</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">LAST NAME*</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">PROVINCE*</label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((prov) => (
              <option key={prov.code} value={prov.code}>
                {prov.name_with_type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">DISTRICT*</label>
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="">Chọn Quận/Huyện</option>
            {districts.map((dist) => (
              <option key={dist.code} value={dist.code}>
                {dist.name_with_type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">WARD*</label>
          <select
            value={ward}
            onChange={(e) => setWard(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1"
          >
            <option value="">Chọn Phường/Xã</option>
            {wards.map((w) => (
              <option key={w.code} value={w.code}>
                {w.name_with_type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">DETAILED ADDRESS*</label>
          <input
            type="text"
            value={detailedAddress}
            onChange={(e) => setDetailedAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 mt-1"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">DATE OF BIRTH*</label>
          <DatePicker
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="dd-MM-yyyy"
            showYearDropdown
            maxDate={new Date()}
            className="border border-gray-300 rounded-md p-2 mt-1"
            placeholderText="Select a date"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold">GENDER</label>
          <div className="flex items-center space-x-4 mt-1">
            <label>
              <input
                type="radio"
                value="Male"
                checked={gender === 'Male'}
                onChange={() => setGender('Male')}
                className="mr-2"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="Female"
                checked={gender === 'Female'}
                onChange={() => setGender('Female')}
                className="mr-2"
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                value="Other"
                checked={gender === 'Other'}
                onChange={() => setGender('Other')}
                className="mr-2"
              />
              Other
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveChanges}
          className="bg-black text-white py-3 px-6 rounded-md font-bold mt-6"
        >
          SAVE CHANGES
        </button>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </form>
    </div>
  );
};

export default AccountSetting;
