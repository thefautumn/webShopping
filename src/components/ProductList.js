import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart, faStar as faEmptyStar } from '@fortawesome/free-regular-svg-icons';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../constants/routes';
import { FavoritesContext } from '../context/FavoritesContext'; // Ensure the path is correct

const ProductList = ({ products }) => {
  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);
  const renderStars = (rating) => {
    // Kiểm tra xem rating có hợp lệ hay không
    if (typeof rating !== 'number' || rating < 0 || rating > 5) {
      rating = 0; // Đặt giá trị mặc định nếu rating không hợp lệ
    }
  
    const fullStars = Math.floor(rating); // Số sao đầy
    const hasHalfStar = rating % 1 !== 0; // Kiểm tra nếu có nửa sao
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Số sao trống
  
    return (
      <>
        {/* Hiển thị sao đầy */}
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-yellow-500" />
          ))}
  
        {/* Hiển thị nửa sao nếu có */}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
  
        {/* Hiển thị sao trống */}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <FontAwesomeIcon key={`empty-${i}`} icon={faEmptyStar} className="text-gray-300" />
          ))}
      </>
    );
  };
  
  return (
    <div className="grid grid-cols-4 gap-8 min-w-[1024px]">
      {products.map((product) => (
        <div key={product._id} className="relative text-center">
          <Link to={`${ROUTES.PRODUCTDETAIL}/${product._id}`}>
            <div className="relative">
              <img
                src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl}
                alt={product.name}
                className="w-full h-80 object-cover mb-4"
              />
              <FontAwesomeIcon
                icon={favoriteIds.includes(product._id) ? faSolidHeart : faRegularHeart}
                className={`absolute top-2 right-2 cursor-pointer ${
                  favoriteIds.includes(product._id) ? 'text-red-500' : 'text-gray-500'
                } hover:text-red-500`}
                size="lg"
                onClick={(e) => {
                  e.preventDefault();
                  toggleFavorite(product._id);
                }}
              />
            </div>
            <h3 className="text-base font-semibold">{product.name}</h3>
            <p className="text-gray-500">{product.price.toLocaleString()} VND</p>
            <div className="flex justify-center items-center">
              {renderStars(product.rating)}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
