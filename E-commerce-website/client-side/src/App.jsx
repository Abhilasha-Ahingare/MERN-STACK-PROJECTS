import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./componets/layouts/UserLayout";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/collectionPage";
import ProductsDetails from "./componets/products/ProductsDetails";
import CheckOut from "./componets/cart/CheckOut";
import OderConformationPage from "./Pages/OderConformationPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import MyOrderPage from "./Pages/MyOrderPage";
import AdminPannel from "./componets/admin/AdminPannel";
import AdminHomePage from "./Pages/AdminHomePage";
import UserMangement from "./componets/admin/UserMangement";
import ProductMangement from "./componets/admin/ProductMangement";
import EditProductPage from "./componets/admin/EditProductPage";
import OrderManagement from "./componets/admin/OrderManagement";

import {Provider} from "react-redux"
import store from "./redux/store";

function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Register />} />
            <Route path="profile" element={<Profile />} />
            <Route path="collection/:collection" element={<CollectionPage />} />
            <Route path="product/:id" element={<ProductsDetails />} />
            <Route path="checkout" element={<CheckOut />} />
            <Route
              path="order-conformation"
              element={<OderConformationPage />}
            />
            <Route path="order/:id" element={<OrderDetailsPage />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
          {/* admin */}
          <Route path="/admin" element={<AdminPannel />}>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserMangement />} />
            <Route path="products" element={<ProductMangement />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="order" element={<OrderManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
