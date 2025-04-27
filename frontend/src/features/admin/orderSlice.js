
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Util from "@/helpers/Util";

const initialState = {
    orderList: [],
    orderDetails: null,
}

export const getAllOrdersForAdmin = createAsyncThunk(
  "order/getAllOrdersForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        "admin/order/get",
        (res, status) => {
          console.log(res);
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);



export const getOrderDetailsForAdmin = createAsyncThunk(
  '/order/getOrderDetailsForAdmin',
  async (id, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        `admin/order/details/${id}`,
        (res, status) => {
          response = res;
        }
      );
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);




const adminOrderSlice = createSlice({
    name: 'adminOrderSlice',
    initialState,
    reducers : {
      resetOrderDetails : (state) => {
        state.orderDetails = null;
      }
    },
    extraReducers : (builder) => {
        builder
        .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(getAllOrdersForAdmin.fulfilled, (state,action) => {
        state.isLoading = false;
        state.orderList = action.payload;
        })
        .addCase(getAllOrdersForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
        })
        .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        })
        .addCase(getOrderDetailsForAdmin.fulfilled, (state,action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
        })
        .addCase(getOrderDetailsForAdmin.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
        });
    }
});

export const {resetOrderDetails} = adminOrderSlice.reducer;

export default adminOrderSlice.reducer