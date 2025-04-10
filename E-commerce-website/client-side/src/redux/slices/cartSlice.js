import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// helpwe function to load cart from loacal storgage
const loadCartFromStorage = () => {
  const storeCart = localStorage.getItem("cart");
  return storeCart ? JSON.parse(storeCart) : { product: [] };
};

// helpwe function to save cart from loacal storgage
const saveCartToStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

//fetch cart for a user or guest

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//add an item to the cart for a user or guest

export const AddToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, sizes, color }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/cart`,
        {
          productId,
          quantity,
          sizes,
          color,
          guestId,
          userId,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//update an item to the cart for a user or guest

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, guestId, userId, sizes, color },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/cart`,
        {
          productId,
          quantity,
          guestId,
          userId,
          sizes,
          color,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

//remove an item from the cart
export const RemoveCartItem = createAsyncThunk(
  "cart/RemoveCartItem",
  async ({ productId, guestId, userId, sizes, color }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_SERVER_URL}/api/cart`,
        data: { productId, guestId, userId, sizes, color },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// marge guest cart to user cart

export const margeCart = createAsyncThunk(
  "cart/margeCart",
  async ({ guestId, user }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/cart/merge-cart`,
        { guestId, user },
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

//cartslice

const cartslice = createSlice({
  name: "cart",
  initialState: {
    cart: loadCartFromStorage(),
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { product: [] };
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
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to fetch cart";
      })

      //add to cart
      .addCase(AddToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(AddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "failed to add to cart";
      })

      //update cart

      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.loading = true;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = true;
        state.error =
          action.payload?.message || "failed to update item quantity";
      })

      // remove crat

      .addCase(RemoveCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RemoveCartItem.fulfilled, (state, action) => {
        state.loading = true;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(RemoveCartItem.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload?.message || "failed to remove item ";
      })

      //marge cart
      .addCase(margeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(margeCart.fulfilled, (state, action) => {
        state.loading = true;
        state.cart = action.payload;
        saveCartToStorage(action.payload);
      })
      .addCase(margeCart.rejected, (state, action) => {
        state.loading = true;
        state.error = action.payload?.message || "failed to marge item ";
      });
  },
});

export const { clearCart } = cartslice.actions;
export default cartslice.reducer;
