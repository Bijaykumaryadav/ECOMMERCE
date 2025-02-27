import Util from "@/helpers/Util";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    approvalURL : null,
    isLoading : false,
    orderId : null
}

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

const shoppingOrderSlice = createSlice({
    name : "shoppingOrderSlice",
    initialState,
    reducers : {},
    extraReducers : (builder) => {
        builder.addCase(createNewOrder.pending , (state) => {
            state.isLoading = true
        }).addCase(createNewOrder.fulfilled , (state,action) => {         
            state.isLoading = false,
            state.approvalURL = action.payload.approvalURL,
            state.orderId = action.payload.orderId
        }).addCase(createNewOrder.rejected , (state) => {
            state.isLoading = false,
            state.approvalURL = null,
            state.orderId = null
        })
    }
})

export default shoppingOrderSlice.reducer;