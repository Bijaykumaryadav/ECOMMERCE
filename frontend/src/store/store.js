import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../features/auth/themeSlice';
import authReducer from "../features/auth/authSlice";
import adminProductSlice from "../features/admin/productSlice";
import shopProductSlice from "../features/shop/productSlice";
import shopCartSlice from "../features/shop/cartSlice";
import shopAddressSlice from "../features/shop/addressSlice";
import commonFeatureSlice from "../features/common/commonSlice";
import shopOrderSlice from "../features/order/orderSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: shopProductSlice,
    shopCart: shopCartSlice,
    shopAddress : shopAddressSlice,
    commonFeature: commonFeatureSlice,
    shopOrder : shopOrderSlice,
  },
});

export default store;
