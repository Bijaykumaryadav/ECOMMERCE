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
      let response;
      console.log(formData);

      await Util.call_Post_by_URI(
        `admin/products/edit/${id}`,
        formData,
        (res, status) => {
          response = res;
        },
      );
      toast.success("Product updated successfully");
      return response.product;
    } catch (error) {
      toast.error(error.response?.product?.message || "Failed to update product");
      return rejectWithValue(error.response?.product);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "/products/deleteProducts",
  async ({ id }, { rejectWithValue }) => {
    try {
      console.log("Received ID for deletion:", id); // Debugging the ID
      let response;

      // Ensure you're calling the correct Util method for deletion
      await Util.call_Delete_by_URI(`admin/products/delete/${id}`, (res, status) => {
        response = res;
      });

      toast.success("Product deleted successfully");
      return response.product;
    } catch (error) {
      console.error("Error deleting product:", error); // Debugging error
      toast.error(
        error.response?.data?.message || "Failed to delete product"
      );
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
      .addCase(addNewProducts.pending, (state,action) => {
        state.isLoading = true;
        console.log(action.payload);
      })
      .addCase(addNewProducts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList.push(action.payload);
      })
      .addCase(addNewProducts.rejected, (state,action) => {
        console.log(action.payload);
        state.isLoading = false;
      })

      // Handle editProducts
      .addCase(editProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedProduct = action.payload; // Edited product directly from the backend
        state.productList = state.productList.map((product) =>
          product._id === updatedProduct._id ? { ...product, ...updatedProduct } : product
        );
      })
      .addCase(editProducts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProducts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteProducts.rejected, (state) => {
        state.isLoading = false;
        toast.error("Failed to delete product");
      });
  },
});

export default AdminProductSlice.reducer;
