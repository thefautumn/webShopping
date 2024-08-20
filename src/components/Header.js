import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { ROUTES } from '../constants/routes';
import LoginModal from './LoginModal';  
import RegisterModal from './RegisterModal';
import { getUserById } from '../services/userService'; 
import {jwtDecode} from 'jwt-decode'; 
import { CartContext } from './CartContext'; 

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = React.useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = React.useState(false);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [timeoutId, setTimeoutId] = React.useState(null);

  const { cart } = useContext(CartContext);  

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userId = jwtDecode(token).id; 
          const userData = await getUserById(userId);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  }, []);

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openRegisterModal = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(true);
  };

  const closeModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLoginSuccess = () => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userId = jwtDecode(token).id;
          const userData = await getUserById(userId);
          setUser(userData);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };

    fetchUser();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate(ROUTES.HOME);
  };

  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200);
    setTimeoutId(id);
  };
  const totalItemsInCart = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 overflow-visible" style={{ minWidth: '1024px' }}>
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="flex items-center space-x-8">
          <div className="text-3xl font-bold">
            <a href={ROUTES.HOME} className="font-serif"> N&A </a>
          </div>
          <nav className="flex space-x-6">
            <a href={ROUTES.SHOP} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">SHOP</a>
            <a href={ROUTES.MALE} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">MEN</a>
            <a href={ROUTES.FEMALE} className="text-x text-gray-800 font-sans font-medium hover:text-gray-600">WOMEN</a>
          </nav>
        </div>
        <div className="flex items-center space-x-10">
          <button onClick={toggleSearch} className="text-gray-800 relative focus:outline-none">
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
          {user ? (
            <div
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-800 relative focus:outline-none flex items-center">
                <FontAwesomeIcon icon={faUser} size="lg" />
                <span className='text-sm ml-3'>{user.firstName}</span>
              </button>
              {isDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <a
                    href={ROUTES.PROFILE}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={openLoginModal} className="text-gray-800 relative focus:outline-none">
              <FontAwesomeIcon icon={faUser} size="lg" />
              <span className='text-sm ml-3'>Đăng nhập</span>
            </button>
          )}
          <a href={ROUTES.CART} className="text-gray-800 relative">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {totalItemsInCart > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">
                {totalItemsInCart}
              </span>
            )}
          </a>
          <a href={ROUTES.FAVORITE} className="text-gray-800 relative">
            <FontAwesomeIcon icon={faHeart} size="lg" />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full px-1">0</span>
          </a>
        </div>
      </div>

      {isSearchOpen && (
        <div className="container mx-auto px-4 py-2">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Search..."
          />
        </div>
      )}

      {isLoginOpen && <LoginModal onClose={closeModals} onRegister={openRegisterModal} onLoginSuccess={handleLoginSuccess} />}
      {isRegisterOpen && <RegisterModal onClose={closeModals} onLogin={openLoginModal} />}
    </header>
  );
};

export default Header;
