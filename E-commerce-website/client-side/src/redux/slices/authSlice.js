import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//retrieve user into and token from localstorage if avaliable

const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

//check for an existing guest id in the localstorage  or generate a new one

const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

//initial state

const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

//asyn thunk for user login

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      console.log("🟡 Sending userData to login:", userData);

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
        userData
      );
      console.log("Login response:", response.data);
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);

      return response.data.user;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

//asyn thunk for user registration

export const registrationUser = createAsyncThunk(
  "auth/registration",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/registration`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.data) {
        throw new Error("No data received from server");
      }

      if (!response.data.user || !response.data.token) {
        throw new Error("Invalid response structure: missing user or token");
      }

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user;
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage;

      if (error.code === "ERR_NETWORK") {
        errorMessage = "Network error: Unable to connect to the server";
      } else if (error.response?.status === 404) {
        errorMessage = "Server endpoint not found. Please check the API URL";
      } else {
        errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Registration failed. Please try again.";
      }

      return rejectWithValue({
        message: errorMessage,
        details: error.response?.data || {},
        code: error.code || "UNKNOWN_ERROR",
      });
    }
  }
);

//create slice

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      .addCase(registrationUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registrationUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registrationUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;

export default authSlice.reducer;
