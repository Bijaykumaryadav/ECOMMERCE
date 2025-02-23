import Util from "@/helpers/Util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  addressList: []
};

export const addNewAddress = createAsyncThunk(
  '/addresses/addNewAddress',
  async (formData, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Post_by_URI(
        'shop/address/add',
        formData,
        (res, status) => {
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllAddresses = createAsyncThunk(
  '/addresses/fetchAllAddresses',
  async (userId, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        `shop/address/get/${userId}`,
        (res, status) => {
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editAddress = createAsyncThunk(
  '/addresses/editAddress',
  async ({ userId, addressId, formData }, { rejectWithValue }) => {
    try {
      let response;
      // Send only the formData object, not wrapped in another object
      await Util.call_Put_by_URI(
        `shop/address/update/${userId}/${addressId}`,
        formData, // Changed this line to send formData directly
        (res, status) => {
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  '/addresses/deleteAddress',
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Delete_by_URI(
        `shop/address/delete/${userId}/${addressId}`,
        (res, status) => {
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchAllAddresses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllAddresses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload;
      })
      .addCase(fetchAllAddresses.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editAddress.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export default addressSlice.reducer;