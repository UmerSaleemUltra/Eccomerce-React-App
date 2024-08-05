import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import themeReducer from './ThemeSlice';
import cartReducer from './Cartslice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, cartReducer);

const store = configureStore({
  reducer: {
    theme: themeReducer,
    cart: persistedReducer
  },
});

const persistor = persistStore(store);

export { store, persistor };
