import { createSlice } from '@reduxjs/toolkit';

// Initial state with a default theme color
const initialState = {
  color: 'white', // Default theme color
};

// Create a slice for theme management
export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.color = action.payload; // Update the theme color
    },
  },
});

// Export actions and reducer
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
