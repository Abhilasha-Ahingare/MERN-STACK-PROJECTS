import "./App.css";
import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";
import HomePage from "./compontes/pages/home";
import About from "./compontes/pages/about";
import LoginPage from "./compontes/pages/login-page";
import Registration from "./compontes/pages/registration";
import ErrorPage from "./compontes/pages/error-page";
import NavBar from "./compontes/navigations-section/nav-page";
import FooterPage from "./compontes/footer";
import ContactPage from "./compontes/pages/contact-page";
import LogOutPage from "./compontes/pages/logout-page";

// admin layout & pages
import AdminLayout from "./compontes/layouts/Admin-Layout";
import UserAdmin from "./compontes/pages/user-admin";
import ContactAdmin from "./compontes/pages/contact-admin";
import ServiceAdmin from "./compontes/pages/services-admin";
import EditAdmin from "./compontes/pages/editAdmin";
import ProductPage from "./compontes/pages/products";

function AppWrapper() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  
  return (
    <>
      {!isAdminRoute && <NavBar />}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<ProductPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogOutPage />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<ErrorPage />} />

        {/* nested admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<UserAdmin />} />
          <Route path="contact" element={<ContactAdmin />} />
          <Route path="services" element={<ServiceAdmin />} />
          <Route path="users/update/:id" element={<EditAdmin />} />
        </Route>
      </Routes>

      {!isAdminRoute && <FooterPage />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
