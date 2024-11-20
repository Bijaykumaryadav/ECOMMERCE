import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/auth/themeSlice';
import authReducer from "../features/auth/authReducer";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
  },
});

export default store;
