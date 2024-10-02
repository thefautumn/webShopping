import React, { createContext, useReducer, useEffect } from 'react';
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, SET_CART } from '../constants/actionTypes';
import { getCart, updateCartItemQuantity, removeCartItem } from '../services/cartService';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        items: action.payload,
      };
    case ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        (item) => item.productId === action.payload.productId && item.size === action.payload.size
      );

      let updatedItems;

      if (existingItemIndex >= 0) {
        // If the item exists, update its quantity
        const updatedItem = {
          ...state.items[existingItemIndex],
          quantity: state.items[existingItemIndex].quantity + action.payload.quantity,
        };

        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        // If the item doesn't exist, add it to the cart
        updatedItems = [...state.items, action.payload];
      }

      return {
        ...state,
        items: updatedItems,
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter(
          (item) => item.productId !== action.payload.productId || item.size !== action.payload.size
        ),
      };

    case UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) =>
          item.productId.toString() === action.payload.productId.toString() && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart();
        if (cartData.items.length === 0) {
 
          return;
        }
        dispatch({ type: SET_CART, payload: cartData.items });
      } catch (error) {
        console.error('Failed to fetch cart:', error.message);
      }
    };

    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, size, quantity) => {
 
    try {
      await updateCartItemQuantity(productId, size, quantity);
      dispatch({ type: UPDATE_QUANTITY, payload: { productId, size, quantity } });
    } catch (error) {
      console.error('Failed to update cart item:', error.message);
    }
  };

  const handleDeleteItem = async (productId, size) => {
    try {
      await removeCartItem(productId, size);
      dispatch({ type: REMOVE_FROM_CART, payload: { productId, size } });
    } catch (error) {
      console.error('Failed to delete cart item:', error.message);
    }
  };

  return (
    <CartContext.Provider value={{ cart: state, dispatch, handleUpdateQuantity, handleDeleteItem }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
