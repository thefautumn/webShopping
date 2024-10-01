import React, { createContext, useReducer, useEffect } from 'react';
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from '../constants/actionTypes';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import { toast } from 'react-toastify';

// Tạo context
export const FavoritesContext = createContext();

// Định nghĩa reducer cho Favorites
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return {
        ...state,
        favoriteIds: action.payload,
      };
    case ADD_FAVORITE:
      return {
        ...state,
        favoriteIds: [...state.favoriteIds, action.payload],
      };
    case REMOVE_FAVORITE:
      return {
        ...state,
        favoriteIds: state.favoriteIds.filter((id) => id !== action.payload),
      };
    default:
      return state;
  }
};

// Định nghĩa Provider cho FavoritesContext
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favoriteIds: [] });

  // Lấy danh sách yêu thích từ backend khi component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites();
        dispatch({ type: SET_FAVORITES, payload: favorites.map((fav) => fav.productId) });
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
        toast.error('Failed to load favorites.');
      }
    };

    fetchFavorites();
  }, []);

  // Thêm hoặc xóa sản phẩm vào/ra khỏi danh sách yêu thích
  const toggleFavorite = async (productId) => {
    try {
      if (state.favoriteIds.includes(productId)) {
        await removeFavorite(productId);
        dispatch({ type: REMOVE_FAVORITE, payload: productId });
        toast.success('Removed from favorites.');
      } else {
        await addFavorite(productId);
        dispatch({ type: ADD_FAVORITE, payload: productId });
        toast.success('Added to favorites.');
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      toast.error('Error occurred while updating favorites.');
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds: state.favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
