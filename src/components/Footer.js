import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { ROUTES } from '../constants/routes';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 overflow-x-auto" style={{ minWidth: '1024px' }}>
      <div className="container mx-auto px-4 grid grid-cols-5 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Về Uniqlo</h3>
          <ul className="space-y-2">
            <li><a href={ROUTES.ABOUT} className="text-gray-800 hover:text-black">Thông tin</a></li>
            <li><a href={ROUTES.STORES} className="text-gray-800 hover:text-black">Danh sách cửa hàng</a></li>
            <li><a href={ROUTES.CAREERS} className="text-gray-800 hover:text-black">Cơ Hội Nghề Nghiệp</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Trợ giúp</h3>
          <ul className="space-y-2">
            <li><a href={ROUTES.FAQ} className="text-gray-800 hover:text-black">FAQ</a></li>
            <li><a href={ROUTES.RETURNS_POLICY} className="text-gray-800 hover:text-black">Chính sách trả hàng</a></li>
            <li><a href={ROUTES.PRIVACY_POLICY} className="text-gray-800 hover:text-black">Chính sách bảo mật</a></li>
            <li><a href={ROUTES.ACCESSIBILITY} className="text-gray-800 hover:text-black">Tiếp cận</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Tài khoản</h3>
          <ul className="space-y-2">
            <li><a href={ROUTES.MEMBERSHIP} className="text-gray-800 hover:text-black">Tư cách thành viên</a></li>
            <li><a href={ROUTES.PROFILE} className="text-gray-800 hover:text-black">Hồ sơ</a></li>
            <li><a href={ROUTES.COUPONS} className="text-gray-800 hover:text-black">Coupons</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Bản tin điện tử</h3>
          <p className="text-gray-800 mb-4">
            Đăng ký ngay và là người đầu tiên nắm được thông tin khi có mặt hàng mới, khuyến mãi, các sự kiện sắp diễn ra tại cửa hàng và nhiều thông tin hữu ích khác.
          </p>
          <a href={ROUTES.SUBSCRIBE} className="text-blue-500 font-semibold hover:underline">ĐĂNG KÝ NGAY</a>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">Tài khoản xã hội UNIQLO</h3>
          <div className="flex space-x-4">
            <a href={ROUTES.FACEBOOK} className="text-gray-800 hover:text-black">
              <FontAwesomeIcon icon={faFacebookSquare} size="2x" />
            </a>
            <a href={ROUTES.INSTAGRAM} className="text-gray-800 hover:text-black">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href={ROUTES.YOUTUBE} className="text-gray-800 hover:text-black">
              <FontAwesomeIcon icon={faYoutube} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 text-center text-gray-600">
        <p className="text-sm">&copy; 2024 UNIQLO VIETNAM CO., LTD. Bảo lưu mọi quyền.</p>
        <p className="text-sm mt-2">
          Tên công ty: UNIQLO VIETNAM CO., LTD. Giấy chứng nhận đăng ký doanh nghiệp số: 0315304731, đăng ký lần đầu ngày 02/10/2018, đăng ký thay đổi lần thứ ba ngày 23/09/2019
        </p>
        <p className="text-sm mt-2">
          Địa chỉ trụ sở doanh nghiệp: Tầng 26, Tòa nhà Trụ Sở Điều Hành Và Trung Tâm Thương Mại Viettel, 285 Cách Mạng Tháng Tám, Phường 12, Quận 10, Thành phố Hồ Chí Minh
        </p>
        <p className="text-sm mt-2">
          Để được giải đáp thắc mắc, vui lòng truy cập trang FAQ/Trợ giúp
        </p>
        <p className="text-sm mt-2">Giờ làm việc: 9:00 - 18:00 (Thứ Hai - Chủ Nhật)</p>
      </div>
    </footer>
  );
};

export default Footer;
