import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}`;
const USER_TOKEN = `Bearer ${localStorage.getItem("userToken")}`;

//async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProduct/fetchAdminProducts",
  async () => {
    const response = await axios.get(`${API_URL}/api/admin/product`, {
      headers: {
        Authorization: USER_TOKEN,
      },
    });
    return response.data;
  }
);

//create a new product
export const createProduct = createAsyncThunk(
  "adminProduct/createProduct",
  async (productData) => {
    const response = await axios.post(
      `${API_URL}/api/admin/product`,
      productData,
      {
        headers: { Authorization: USER_TOKEN },
      }
    );
    return response.data;
  }
);

//update a product

export const updateProduct = createAsyncThunk(
  "adminProduct/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${API_URL}/api/admin/product/${id}`,
      productData,
      {
        headers: {
          Authorization: USER_TOKEN,
        },
      }
    );
    return response.data;
  }
);

//delete product

export const deleteProduct = createAsyncThunk(
  "adminProduct/deleteProduct",
  async (id) => {
    await axios.delete(`${API_URL}/api/product/${id}`, {
      headers: { Authorization: USER_TOKEN },
    });
    return id;
  }
);

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    product: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      //create product
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product.push(action.payload);
      })

      //update product
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.product.findIndex(
          (product) => product?._id === action.payload?._id
        );
        if (index !== -1) {
          state.product[index] = action.payload;
        }
      })

      //delete product
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.product = state.product.filter(
          (product) => product?._id !== action.payload
        );
      });
  },
});
export default adminProductSlice.reducer
