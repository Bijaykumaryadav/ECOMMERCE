import Util from "@/helpers/Util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch all products
export const fetchAllFilteredProducts = createAsyncThunk(
  "product/fetchAllFilteredProducts",
  async ({filterParams,sortParams}, { rejectWithValue }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams
    })
    try {
      let response;
      await Util.call_get_with_uri_param(
        `shop/products/get?${query}`,
        (res, status) => {
          // console.log(res);
          response = res;
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        `shop/products/get/${id}`,
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

const initialState = {
    isLoading: false,
    productList: [],
    productDetails: null,
}

const shoppingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(fetchAllFilteredProducts.pending,(state,action)=> {
        state.isLoading = true,
        console.log(action.payload);
      }).addCase(fetchAllFilteredProducts.fulfilled,(state,action)=> {
        console.log(action.payload);
        state.isLoading = false,
        state.productList = action.payload || []
      }).addCase(fetchAllFilteredProducts.rejected,(state,action)=> {
        console.log(action.payload);
        state.isLoading = false,
        state.productList = []
      })
      .addCase(fetchProductDetails.pending,(state,action)=> {
        state.isLoading = true,
        console.log(action.payload);
      }).addCase(fetchProductDetails.fulfilled,(state,action)=> {
        console.log(action.payload);
        state.isLoading = false,
        state.productDetails = action.payload
      }).addCase(fetchProductDetails.rejected,(state,action)=> {
        console.log(action.payload);
        state.isLoading = false,
        state.productDetails = null
      })
    }
})

export default shoppingProductSlice.reducer;