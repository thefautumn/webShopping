import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { getFavorites } from '../services/favoriteService';
import { getProductById } from '../services/productService';  // Ensure you import the function to fetch product details
import { addToCart } from '../services/cartService';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import { ADD_TO_CART } from '../constants/actionTypes';
import LoginModal from '../components/LoginModal';
import {jwtDecode} from 'jwt-decode';  // Correct the import

const FavoritePage = () => {
  const { favoriteIds, toggleFavorite } = useContext(FavoritesContext);
  const { dispatch } = useContext(CartContext);
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});
  const [quantity, setQuantity] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavoriteProducts = async () => {
      try {
        const favorites = await getFavorites();
        const productIds = favorites.map((favorite) => {
          if (typeof favorite.productId === 'object' && favorite.productId._id) {
            return favorite.productId._id.toString(); // Extract and ensure it's a string
          }
          return favorite.productId; // If already a string
        });

        // Fetch full product details
        const productsPromises = productIds.map((id) => getProductById(id).catch((error) => null)); // Handle individual fetch errors
        const products = await Promise.all(productsPromises);

        // Filter out any null responses due to errors in fetching
        const validProducts = products.filter(product => product !== null && product.product !== undefined);
        setFavoriteProducts(validProducts.map(product => product.product)); // Adjust based on your productService response structure

        // Initialize sizes and quantities
        const initialSizes = {};
        const initialQuantities = {};
        validProducts.forEach(product => {
          const availableSizes = product.product.stocks.filter(stock => stock.quantity > 0).map(stock => stock.size);
          initialSizes[product.product._id] = availableSizes[0] || '';
          initialQuantities[product.product._id] = 1;
        });
        setSelectedSize(initialSizes);
        setQuantity(initialQuantities);

      } catch (error) {
        console.error('Failed to fetch favorite products:', error);
        setErrorMessage('Failed to fetch favorite products.');
      }
    };

    if (favoriteIds.length > 0) {
      fetchFavoriteProducts();
    } else {
      setFavoriteProducts([]); // Clear favorites if no IDs are present
    }
  }, [favoriteIds]);

  const handleSizeChange = (productId, size) => {
    setSelectedSize(prevState => ({
      ...prevState,
      [productId]: size
    }));
    setErrorMessage('');
  };

  const handleQuantityChange = (productId, value) => {
    if (isNaN(value) || value < 1) {
      setQuantity(prevState => ({
        ...prevState,
        [productId]: 1
      }));
    } else {
      const selectedStock = favoriteProducts.find(p => p._id === productId).stocks.find(stock => stock.size === selectedSize[productId]);
      if (value > selectedStock.quantity) {
        setErrorMessage('Không đủ số lượng trong kho');
        setQuantity(prevState => ({
          ...prevState,
          [productId]: selectedStock.quantity
        }));
      } else {
        setErrorMessage('');
        setQuantity(prevState => ({
          ...prevState,
          [productId]: value
        }));
      }
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.');
        setIsLoginOpen(true);
        return;
      }

      const userId = jwtDecode(token).id;
      if (!userId) {
        setErrorMessage('Invalid token: User ID not found.');
        return;
      }

      const selectedStock = product.stocks.find(stock => stock.size === selectedSize[product._id]);
      if (quantity[product._id] > selectedStock.quantity) {
        setErrorMessage('Không đủ số lượng trong kho');
      } else {
        await addToCart(userId, product._id, quantity[product._id], selectedSize[product._id]);
        dispatch({
          type: ADD_TO_CART,
          payload: {
            productId: product._id,
            name: product.name,
            price: product.price,
            size: selectedSize[product._id],
            quantity: quantity[product._id],
            imageUrl: product.imageUrl[0],
          },
        });
        setSuccessMessage('Sản phẩm đã được thêm vào giỏ hàng');
        setErrorMessage('');
      }
    } catch (error) {
      setErrorMessage('Failed to add product to cart. Please try again later.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Favorites</h1>
      <p className="text-right text-sm mb-4">{favoriteProducts.length} products</p>

      {/* Wishlist Items Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {favoriteProducts.map((product) => (
          <div key={product._id} className="flex flex-col items-center border p-4 rounded-lg shadow-md w-full max-w-xs mx-auto">
            <img 
              src={Array.isArray(product.imageUrl) ? product.imageUrl[0] : product.imageUrl} 
              alt={product.name} 
              className="w-full h-auto object-cover mb-4" 
            />
            <div className="flex justify-between items-start w-full">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.price ? `${product.price.toLocaleString()} VND` : 'Price not available'}</p>
                <p className="text-gray-600 text-sm">{product.newArrival ? 'New Arrival' : ''}</p>
               </div>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => toggleFavorite(product._id)} // Remove from favorites
              >
                <FontAwesomeIcon icon={faTrashAlt} />
              </button>
            </div>
            <div className="mt-4 w-full">
              <select 
                className="w-full border border-gray-300 p-2 rounded mb-4 text-sm"
                value={selectedSize[product._id]}
                onChange={(e) => handleSizeChange(product._id, e.target.value)}
              >
                <option value="">Select Size</option>
                {product.stocks && product.stocks.length > 0 ? (
                  product.stocks.map((stock) => (
                    <option key={stock.size} value={stock.size}>{stock.size}</option>
                  ))
                ) : (
                  <option disabled>No sizes available</option>
                )}
              </select>
              <button 
                className="w-full bg-black text-white py-2 rounded-md text-sm mt-2" 
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div> 

      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </div>
  );
};

export default FavoritePage;
