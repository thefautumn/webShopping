import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { ROUTES } from '../constants/routes';
import { FavoritesContext } from '../context/FavoritesContext'; // Ensure the path is correct

const ProductList = ({ products }) => {
  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);

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
            <p className="text-yellow-500">
              {'★'.repeat(Math.floor(product.rating))}
              {product.rating % 1 !== 0 && '½'}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
