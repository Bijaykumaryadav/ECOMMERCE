import Util from "@/helpers/Util";

const {createSlice, createAsyncThunk} = require("@reduxjs/toolkit");

const initialState = {
    cartItems : [],
    isLoading : false,
}

export const addToCart = createAsyncThunk('/cart/addToCart',  async ({userId,productId,quantity}, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Post_by_URI(
        'shop/cart/add',
        (res, status) => {
          console.log(res);
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchCartItems = createAsyncThunk('/cart/fetchCartItems',  async (userId, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        `shop/cart/get/${userId}`,
        (res, status) => {
          console.log(res);
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCartItem = createAsyncThunk('/cart/addToCart',  async ({userId,productId}, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Delete_by_URI(
        `shop/cart/add/${userId}/${productId}`,
        (res, status) => {
          console.log(res);
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const shoppingCartSlice = createSlice({
    name: 'shoppingCart',
    initialState,
    reducers : {},
    extraReducers : (builder) => {

    }
})