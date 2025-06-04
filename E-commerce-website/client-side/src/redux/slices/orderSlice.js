import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import api from "../../utils/api";

// Fetch orders of the current user
export const fetchMyOrders = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/order/myorder`);
      // Ensure the API returns the correct structure.
      return response.data  
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
      return response.data || {}; // Ensure the API returns the order object as expected.
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch order details" }
      );
    }
  }
);

// // Add these selectors before the orderSlice definition
// export const selectOrderState = (state) => state.orders || { orders: [], loading: false, error: null };

// export const selectOrders = createSelector(
//   [selectOrderState],
//   (orderState) => orderState.orders || []
// );

// export const selectSelectedOrder = createSelector(
//   [selectOrderState],
//   (orderState) => orderState.selectedOrder || null
// );

// export const selectOrderLoading = createSelector(
//   [selectOrderState],
//   (orderState) => orderState.loading
// );

// export const selectOrderError = createSelector(
//   [selectOrderState],
//   (orderState) => orderState.error
// );

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    selectedOrder: null,
    loading: false,
    error: null,
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
        state.orders = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
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
        state.selectedOrder = action.payload || null;
        state.error = null;
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
