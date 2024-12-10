import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/auth/themeSlice';
import authReducer from "../features/auth/authSlice";
import adminProductSlice from "../features/admin/productSlice";
import shopProductSlice from "../features/shop/productSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice
  },
});

export default store;
