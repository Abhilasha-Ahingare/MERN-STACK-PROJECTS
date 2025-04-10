import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productRouter from "./slices/product-Slice";
import cartReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productRouter,
    cart: cartReducer,
  },
});

export default store;
