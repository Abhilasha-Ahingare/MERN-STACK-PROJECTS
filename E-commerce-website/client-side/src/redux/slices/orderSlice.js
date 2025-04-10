import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch user order
export const fetchUserOrder = createAsyncThunk(
  "order/fetchUserOrder",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/order/myorder`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//orders details by id
export const fetchOrderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (fetchOrderDetails, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    totalOrder: 0,
    orderDetails: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      //user order
      .addCase(fetchUserOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(fetchUserOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      //order details
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default orderSlice.reducer


