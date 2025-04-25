import Util from "@/helpers/Util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  paypalOrderId: null,
  payerID: null,
  orderList: [],
  orderDetails: null,
};

export const createNewOrder = createAsyncThunk("/order/createNewOrder",  
    async (orderData, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Post_by_URI(
        'shop/order/create',
        orderData,
        (res, status) => {
          // console.log("response is:",res);
          response = res;
        }
      );
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  })

// Add a new thunk for handling the return from PayPal
export const capturePayPalPayment = createAsyncThunk(
  "/order/capturePayment",
  async ({payerId, paypalOrderId, orderId }, { rejectWithValue }) => {
    try {
      return await new Promise((resolve, reject) => {
        Util.call_Post_by_URI(
          'shop/order/capture',
          {payerId, paypalOrderId, orderId },
          (res, status) => {
            if (status >= 200 && status < 300) {
              resolve(res);
            } else {
              reject({ response: { data: res } });
            }
          }
        );
      });
    } catch (error) {
      return rejectWithValue(error.response?.data || error);
    }
  }
);

export const getAllOrdersByUserId = createAsyncThunk('/order/getAllOrdersByUserId',  async (userId, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        `shop/order/list/${userId}`,
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

export const getOrderDetails = createAsyncThunk('/order/getOrderDetails',  async (id, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        `shop/order/details/${id}`,
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

const shoppingOrderSlice = createSlice({
  name: "shoppingOrderSlice",
  initialState,
  reducers: {
    // Add a reducer to handle setting PayPal return parameters
    setPayPalReturnParams: (state, action) => {
      const { token, PayerID } = action.payload;
      state.payerID = PayerID;
      state.paypalOrderId = token;
    },
    clearOrderData: (state) => {
      state.approvalURL = null;
      state.orderId = null;
      state.paypalOrderId = null;
      state.payerID = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        state.paypalOrderId = action.payload.paypalOrderId;
        // Store orderId in sessionStorage
        sessionStorage.setItem('currentOrderId', JSON.stringify(action.payload.orderId));
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
        state.paypalOrderId = null;
      })
      .addCase(capturePayPalPayment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(capturePayPalPayment.fulfilled, (state) => {
        state.isLoading = false;
        // Clear data after successful payment
        state.approvalURL = null;
        state.orderId = null;
        state.paypalOrderId = null;
        state.payerID = null;
        // Clear sessionStorage
        sessionStorage.removeItem('currentOrderId');
      })
      .addCase(capturePayPalPayment.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrdersByUserId.fulfilled, (state,action) => {
        state.isLoading = false;
        state.orderList = action.payload;
      })
      .addCase(getAllOrdersByUserId.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state,action) => {
        state.isLoading = false;
        state.orderDetails = action.payload;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
        state.orderDetails = null;
      });
  }
});

export const { setPayPalReturnParams, clearOrderData } = shoppingOrderSlice.actions;
export default shoppingOrderSlice.reducer;