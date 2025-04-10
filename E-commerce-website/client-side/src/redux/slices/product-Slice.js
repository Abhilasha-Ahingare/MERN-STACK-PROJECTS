import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//asyn thunk to fetch products by collection and optional filters
export const FetchProductByFilters = createAsyncThunk(
  "product/fetchByFilters",
  async ({
    productCollection,
    sizes,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    category,
    material,
    brand,
    limit,
    search,
  }) => {
    const query = new URLSearchParams();
    if (productCollection) query.append("productCollection", productCollection);
    if (sizes) query.append("sizes", sizes);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (material) query.append("material", material);
    if (sortBy) query.append("sortBy", sortBy);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);
    if (search) query.append("search", search);

    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/product?${query.toString()}`
    );

    return response.data;
  }
);

//single product by id

export const FetchProductByDetails = createAsyncThunk(
  "product/fetchProductByDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/product/${id}`
    );

    return response.data;
  }
);

// thunk to fetch update similar products

export const updateProduct = createAsyncThunk(
  "product/Update/product",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_SERVER_URL}/api/product/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      }
    );

    return response.data;
  }
);

//similar products get

export const SimilarProduct = createAsyncThunk(
  "product/similarProduct",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_SERVER_URL}/api/product/similar/${id}`
    );

    return response.data;
  }
);

const productSlice = createSlice({
  name: "Products",
  initialState: {
    product: [],
    selectedProduct: null,
    similarProduct: [],
    loading: false,
    error: null,
    filters: {
      category: "",
      sizes: "",
      color: "",
      gender: "",
      brand: "",
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "",
      material: "",
      productCollection: "",
    },
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        sizes: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        search: "",
        sortBy: "",
        material: "",
        productCollection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      //handle fetching products with filter
      .addCase(FetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.product = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(FetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //fetching single product details

      .addCase(FetchProductByDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProductByDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(FetchProductByDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      //update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.updateProduct = action.payload;
        const index = state.product.findIndex(
          (product) => product._id === updateProduct._id
        );
        if (index !== -1) {
          state.product[index] = updateProduct._id;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
