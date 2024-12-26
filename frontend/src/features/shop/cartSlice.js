import Util from "@/helpers/Util";

import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    cartItems : [],
    isLoading : false,
}

export const addToCart = createAsyncThunk('/cart/addToCart',  async ({userId,productId,quantity}, { rejectWithValue }) => {
  console.log(userId,productId,quantity,"since the add to cart is");
    try {
      let response;
      await Util.call_Post_by_URI(
        'shop/cart/add',
        {userId,productId,quantity},
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

export const deleteCartItem = createAsyncThunk('/cart/deleteCartItem',  async ({userId,productId}, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Delete_by_URI(
        `shop/cart/${userId}/${productId}`,
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

export const updateCartQuantity = createAsyncThunk('/cart/updateCartQuantity',  async ({userId,productId,quantity}, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Put_by_URI(
        `shop/cart/update-cart`,
        {userId,productId,quantity},
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
      builder.addCase(addToCart.pending,(state) => {
        state.isLoading = true;
      }).addCase(addToCart.fulfilled,(state,action) => {
        state.isLoading = false;
        state.cartItems = action.payload; 
      }).addCase(addToCart.rejected,(state) => {
        state.isLoading = false;
        state.cartItems = []
      }).addCase(fetchCartItems.pending,(state) => {
        state.isLoading = true;
      }).addCase(fetchCartItems.fulfilled,(state,action) => {
        state.isLoading = false;
        state.cartItems = action.payload; 
      }).addCase(fetchCartItems.rejected,(state) => {
        state.isLoading = false;
        state.cartItems = []
      }).addCase(updateCartQuantity.pending,(state) => {
        state.isLoading = true;
      }).addCase(updateCartQuantity.fulfilled,(state,action) => {
        state.isLoading = false;
        state.cartItems = action.payload; 
      }).addCase(updateCartQuantity.rejected,(state) => {
        state.isLoading = false;
        state.cartItems = []
      }).addCase(deleteCartItem.pending,(state) => {
        state.isLoading = true;
      }).addCase(deleteCartItem.fulfilled,(state,action) => {
        state.isLoading = false;
        state.cartItems = action.payload; 
      }).addCase(deleteCartItem.rejected,(state) => {
        state.isLoading = false;
        state.cartItems = []
      })
    }
})

export default shoppingCartSlice.reducer;