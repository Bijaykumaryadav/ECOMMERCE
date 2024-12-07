import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Util from "@/helpers/Util";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  productList: [],
};

// Async thunk to add a new product
export const addNewProducts = createAsyncThunk(
  "admin/products/addnewproduct",
  async (formData, { rejectWithValue }) => {
    try {
      let response;
      console.log(formData);

      await Util.call_Post_by_URI(
        "admin/products/add",
        formData,
        (res, status) => {
          response = res;
        },
      );
      toast.success("Product created successfully");
      return response.product;
    } catch (error) {
      console.log("error is",error);
      toast.error(error.response?.data?.message || "Failed to create product");
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "product/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        "admin/products/get",
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



// Async thunk to edit a product
export const editProducts = createAsyncThunk(
  "/products/editProducts",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await Util.call_Post_by_URI(`admin/products/edit/${id}`, formData);
      toast.success("Product updated successfully");
      return response.data; // Return the response data
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update product");
      return rejectWithValue(error.response?.data);
    }
  }
);

const AdminProductSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchAllProducts
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload; // Update productList with the fetched data
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = []; // Reset productList on error
      })

      // Handle addNewProducts
      .addCase(addNewProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("New product added successfully"); // Optional toast notification
      })
      .addCase(addNewProducts.rejected, (state) => {
        state.isLoading = false;
      })

      // Handle editProducts
      .addCase(editProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProducts.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Product edited successfully"); // Optional toast notification
      })
      .addCase(editProducts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default AdminProductSlice.reducer;
