import { Navigate, NavLink, Outlet } from "react-router-dom";
import { UserAuth } from "../../store/auth";
import "./AdminLayout.css";

const AdminLayout = () => {
  const { user, isLoading } = UserAuth();

  if (isLoading) {
    return <h1>loading....</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <section className="about-container">
        <div className="about-navbar">
          <h2>Admin Panel</h2>
          <nav>
            <NavLink to="/admin/users">Users</NavLink>
            <NavLink to="/admin/services">Services</NavLink>
            <NavLink to="/admin/contact">Contact</NavLink>
            <NavLink to="/">Home</NavLink>
          </nav>
        </div>

        <div className="about-welcome">
          <h1>Welcome to {user?.username || "Guest"} </h1>
          <p>
            Your go-to destination for elegant, handcrafted jewelry that tells a
            story of timeless beauty.
          </p>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default AdminLayout;
