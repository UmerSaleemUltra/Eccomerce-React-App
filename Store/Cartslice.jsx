import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        // Increase quantity if product already exists
        existingProduct.quantity += 1;
      } else {
        // Add new product with quantity 1
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          // Decrease quantity if more than 1
          existingProduct.quantity -= 1;
        } else {
          // Remove product if quantity is 1
          state.cart = state.cart.filter(item => item.id !== action.payload.id);
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
