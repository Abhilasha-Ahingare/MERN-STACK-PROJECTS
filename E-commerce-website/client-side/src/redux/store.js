import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import productRouter from "./slices/product-Slice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import orderReducer from "./slices/orderSlice";
import adminReducer from "./slices/adminSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productRouter,
    cart: cartReducer,
    checkout: checkoutReducer,
    order: orderReducer,
    admin: adminReducer,
  },
});

export default store;
