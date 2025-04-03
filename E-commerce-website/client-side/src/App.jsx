import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./componets/layouts/UserLayout";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLayout />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
