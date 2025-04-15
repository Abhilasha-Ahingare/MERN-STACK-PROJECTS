import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { margeCart } from "./cartSlice";

const loadUserFromStorage = () => {
  try {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error loading user from storage:", error);
    return null;
  }
};

const loadGuestId = () => {
  let guestId = localStorage.getItem("guestId");
  if (!guestId) {
    guestId = `guest_${new Date().getTime()}`;
    localStorage.setItem("guestId", guestId);
  }
  return guestId;
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { dispatch, getState, rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      const guestId = getState().auth.guestId;

      // If we have a guestId and items in guest cart, merge them
      if (guestId) {
        try {
          await dispatch(margeCart({ guestId }));
          localStorage.removeItem("guestId"); // Clear guestId after successful merge
        } catch (error) {
          console.error("Error merging carts:", error);
        }
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/registration", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  localStorage.removeItem("user");
  // Don't remove guestId on logout to maintain cart
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: loadUserFromStorage(),
    guestId: loadGuestId(),
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        // Don't set user on registration, let them login
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Registration failed";
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        // Maintain guestId for cart persistence
        if (!state.guestId) {
          state.guestId = loadGuestId();
        }
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
