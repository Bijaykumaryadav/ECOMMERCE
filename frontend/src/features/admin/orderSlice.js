
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

export const updateOrderStatus = createAsyncThunk('/cart/updateOrderStatus',  async ({id,orderStatus}, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Put_by_URI(
        `admin/order/update/${id}`,
        {orderStatus},
        (res, status) => {
          console.log(res,status);
          response = res;
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
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

export const {resetOrderDetails} = adminOrderSlice.actions;

export default adminOrderSlice.reducer