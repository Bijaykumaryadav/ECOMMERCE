const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
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
      return response.listOfProducts;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
    isLoading: false,
    productList: []
}

const shopingProductSlice = createSlice({
    name: 'shoppingProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})