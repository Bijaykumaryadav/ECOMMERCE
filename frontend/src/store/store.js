import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/auth/themeSlice';
import authReducer from "../features/auth/authSlice";
import adminProductSlice from "../features/admin/productSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    adminProducts: adminProductSlice,
  },
});

export default store;
