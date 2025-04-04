import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./componets/layouts/UserLayout";
import "./App.css";
import Home from "./store/Home";

function App() {
  return (
    <>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
