import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//fetch all users (admin only)

export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  const response = await axios.get(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/user`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
    }
  );
  return response.data;
});

//add the create user action

export const addUser = createAsyncThunk(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/admin/user`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

//update user info

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ id, name, email, role }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/admin/user/${id}`,
      { name, email, role },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );
    return response.data;
  }
);

//delete a user
export const deleteUser = createAsyncThunk("admin/deleteUser", async (id) => {
  await axios.delete(
    `${import.meta.env.VITE_SERVER_URL}/api/admin/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
  return id;
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    user: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = true;
        state.error = action.error.message;
      })

      //update
      .addCase(updateUser.fulfilled, (state, action) => {
        const updateUser = action.payload;
        const userIndex = state.user.findIndex(
          (user) => user._id === updateUser._id
        );
        if (userIndex !== -1) {
          state.user[userIndex] = updateUser;
        }
      })

      //delete
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.user = state.user.filter((user) => user._id !== action.payload);
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user.push(action.payload.user);
      })
      .addCase(addUser.pending, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});


export default adminSlice.reducer;
