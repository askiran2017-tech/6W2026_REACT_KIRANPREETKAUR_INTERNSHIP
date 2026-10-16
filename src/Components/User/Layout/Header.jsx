import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AuthServices from "../../../Services/AuthServices";

export default function Header() {
  const nav = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsLogin(AuthServices.isLoggedIn());
    setIsAdmin(AuthServices.isAdmin());
  }, [location]);

  async function handleLogout(e) {
    e.preventDefault();
    await AuthServices.logOut();
    setIsLogin(false);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    nav("/");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to={isLogin ? "/ViewInternship" : "/"}
          className="navbar-brand d-flex align-items-center text-center py-0 px-3 px-lg-4"
        >
          <h2 className="m-0 text-primary fw-bold">STUDENT PANEL</h2>
        </Link>
        <button
          type="button"
          className="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto p-4 p-lg-0 pe-lg-4 align-items-lg-center">
            <NavLink
              to="/ViewCategory"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Categories
            </NavLink>
            <NavLink
              to="/ViewInternship"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Internships
            </NavLink>
            <NavLink
              to="/ViewHackathon"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Hackathons
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/Admin/Dashboard"
                className="nav-item nav-link text-danger fw-bold"
              >
                Admin Panel
              </NavLink>
            )}

            {isLogin ? (
              <>
                <NavLink
                  to="/ManageApplication"
                  className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                >
                  My Applications
                </NavLink>
                <NavLink
                  to="/ViewResult"
                  className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                >
                  Results
                </NavLink>
                <NavLink
                  to="/Profile"
                  className={({ isActive }) => "nav-item nav-link text-primary fw-bold" + (isActive ? " active" : "")}
                >
                  Profile
                </NavLink>
                <Link
                  to="#"
                  className="nav-item nav-link text-danger fw-bold ms-lg-2"
                  onClick={handleLogout}
                >
                  LogOut
                </Link>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/Register"
                  className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}