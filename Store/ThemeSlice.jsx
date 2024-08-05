// ThemeSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Define initial state with default theme color
const initialState = {
  color: 'light', // Default theme color or mode
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.color = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
