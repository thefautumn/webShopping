// src/context/FavoritesContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService';
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_FAVORITES } from '../constants/actionTypes';

// Create the FavoritesContext
export const FavoritesContext = createContext();

// Define the reducer function
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

// Define the provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, { favoriteIds: [] });

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favorites = await getFavorites(); // Fetch the list of favorite products from the backend
        dispatch({ type: SET_FAVORITES, payload: favorites.map((fav) => fav.productId) });
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  const toggleFavorite = async (productId) => {
    try {
      if (state.favoriteIds.includes(productId)) {
        await removeFavorite(productId); // Call the removeFavorite function
        dispatch({ type: REMOVE_FAVORITE, payload: productId });
      } else {
        await addFavorite(productId); // Call the addFavorite function
        dispatch({ type: ADD_FAVORITE, payload: productId });
      }
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      alert('Failed to update favorites.');
    }
  };

  return (
    <FavoritesContext.Provider value={{ favoriteIds: state.favoriteIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
