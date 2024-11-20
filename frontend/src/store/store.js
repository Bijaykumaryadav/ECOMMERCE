import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
