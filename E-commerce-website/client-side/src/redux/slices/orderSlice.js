import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch orders of the current user
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/order/myorder");
      // Ensure the API returns the correct structure.
      return response.data || []; // If response is an object, ensure you extract data as expected.
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch orders" }
      );
    }
  }
);

// Fetch single order by ID
export const fetchOrderById = createAsyncThunk(
  "order/fetchOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/order/${orderId}`);
      // Assuming the response contains the full order object, adjust if needed.
      return response.data || {}; // Ensure the API returns the order object as expected.
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch order details" }
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],           // List of orders
    selectedOrder: null,   // Selected order details
    loading: false,        // Loading state
    error: null,           // Error state
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch my orders
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Save the fetched orders in state
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders"; // Error handling
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload; // Save the selected order details
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch order details"; // Error handling
      });
  },
});

export const { clearError, clearSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
