import Util from "@/helpers/Util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch all products
export const fetchAllFilteredProducts = createAsyncThunk(
  "product/fetchAllFilteredProducts",
  async (_, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        "shop/products/get",
        (res, status) => {
          console.log(res);
          response = res;
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
    isLoading: false,
    productList: []
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
    }
})

export default shoppingProductSlice.reducer;