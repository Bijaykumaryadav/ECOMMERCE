import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [],
};


export const getFeatureImages = createAsyncThunk('/order/getFeatureImages',  async (_, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_get_with_uri_param(
        "/common/feature/get",
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


export const addFeatureImage = createAsyncThunk('/order/addFeatureImage',  async ({image}, { rejectWithValue }) => {
    try {
      let response;
      await Util.call_Post_by_URI(
        'common/feature/add',
        {image},
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

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      });
  },
});

export default commonSlice.reducer;