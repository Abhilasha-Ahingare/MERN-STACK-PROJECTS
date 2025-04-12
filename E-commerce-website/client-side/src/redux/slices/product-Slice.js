import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const FetchProductByFilters = createAsyncThunk(
  "product/fetchByFilters",
  async (
    {
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
    },
    { rejectWithValue }
  ) => {
    try {
      const query = new URLSearchParams();
      if (productCollection)
        query.append("productCollection", productCollection);
      if (sizes?.length) query.append("sizes", sizes.join(","));
      if (material?.length) query.append("material", material.join(","));
      if (brand?.length) query.append("brand", brand.join(","));
      if (color) query.append("color", color);
      if (gender) query.append("gender", gender);
      if (minPrice) query.append("minPrice", minPrice);
      if (maxPrice) query.append("maxPrice", maxPrice);
      if (sortBy) query.append("sortBy", sortBy);
      if (limit) query.append("limit", limit);
      if (search) query.append("search", search);
      if (category) query.append("category", category);

      const response = await api.get(`/api/product?${query.toString()}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch products" }
      );
    }
  }
);

export const FetchProductByDetails = createAsyncThunk(
  "product/fetchProductByDetails",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch product details" }
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/Update/product",
  async ({ id, productData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/api/product/${id}`, productData);
      return response.data.updatedProduct;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update product" }
      );
    }
  }
);

export const SimilarProduct = createAsyncThunk(
  "product/similarProduct",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api/product/similar/${id}`);
      return response.data.similarProducts || [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch similar products" }
      );
    }
  }
);

const productSlice = createSlice({
  name: "Products",
  initialState: {
    product: [],
    selectedProduct: null,
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      category: [],
      sizes: [],
      color: [],
      gender: [],
      brand: [],
      minPrice: "",
      maxPrice: "",
      search: "",
      sortBy: "",
      material: [],
      productCollection: "",
    },
  },

  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: [],
        sizes: [],
        color: [],
        gender: [],
        brand: [],
        minPrice: "",
        maxPrice: "",
        search: "",
        sortBy: "",
        material: [],
        productCollection: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch product list
      .addCase(FetchProductByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FetchProductByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(FetchProductByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch products.";
        state.product = [];
      })

      // Fetch product details
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
        state.error =
          action.error.message || "Failed to fetch product details.";
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload;
        const index = state.product.findIndex((p) => p._id === updated._id);
        if (index !== -1) {
          state.product[index] = updated;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product.";
      })

      // Similar products
      .addCase(SimilarProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SimilarProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(SimilarProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch similar products.";
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;
