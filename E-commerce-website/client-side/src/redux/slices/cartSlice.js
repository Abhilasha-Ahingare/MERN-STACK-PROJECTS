import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

const loadCartFromStorage = () => {
  try {
    const cartData = localStorage.getItem("cart");
    if (!cartData || cartData === "undefined") return { products: [] };
    return JSON.parse(cartData);
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return { products: [] };
  }
};

const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/cart", {
        params: { userId, guestId },
      });
      return response.data; // API now returns cart directly
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch cart" }
      );
    }
  }
);

export const AddToCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, sizes, color, guestId, userId },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/api/cart", {
        productId,
        quantity,
        sizes,
        color,
        guestId,
        userId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add to cart" }
      );
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, guestId, userId, sizes, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.put("/api/cart", {
        productId,
        quantity,
        guestId,
        userId,
        sizes,
        color,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to update cart item" }
      );
    }
  }
);

export const RemoveCartItem = createAsyncThunk(
  "cart/RemoveCartItem",
  async ({ productId, guestId, userId, sizes, color }, { rejectWithValue }) => {
    try {
      const response = await api.delete("/api/cart", {
        data: { productId, guestId, userId, sizes, color },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to remove cart item" }
      );
    }
  }
);

export const margeCart = createAsyncThunk(
  "cart/margeCart",
  async ({ guestId }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/cart/merge-cart", { guestId });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to merge cart" }
      );
    }
  }
);

const initialState = {
  cart: loadCartFromStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store cart data directly
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch cart";
        state.cart = { products: [], totalPrice: 0 };
      })

      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store cart data directly
        saveCartToStorage(action.payload);
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to add to cart";
      })

      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store cart data directly
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to update cart item";
      })

      .addCase(RemoveCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemoveCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload.deleteCart; // Access the cart from deleteCart property
        saveCartToStorage(action.payload.deleteCart);
      })
      .addCase(RemoveCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to remove cart item";
      })

      .addCase(margeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(margeCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload; // Store cart data directly
        saveCartToStorage(action.payload);
      })
      .addCase(margeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to merge cart";
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
