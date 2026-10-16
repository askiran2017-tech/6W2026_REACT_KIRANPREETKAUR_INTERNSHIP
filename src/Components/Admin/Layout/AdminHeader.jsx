import { Link, NavLink, useNavigate } from "react-router-dom"
import AuthServices from "../../../Services/AuthServices"
import { toast } from "react-toastify"

export default function AdminHeader() {
  const nav = useNavigate()

  async function logout(e) {
    if (e) e.preventDefault();
    await AuthServices.logOut()
    toast.success("Logout Successful")
    nav("/")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
        <Link
          to="/Admin/Dashboard"
          className="navbar-brand d-flex align-items-center text-center py-0 px-3 px-lg-4"
        >
          <h2 className="m-0 text-primary fw-bold">ADMIN PANEL</h2>
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
              to="/Admin/Dashboard"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/Admin/ManageStudent"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Students
            </NavLink>
            <NavLink
              to="/Admin/ManageCategory"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Categories
            </NavLink>
            <NavLink
              to="/Admin/ManageInternship"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Internships
            </NavLink>
            <NavLink
              to="/Admin/ManageHackathon"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Hackathons
            </NavLink>
            <NavLink
              to="/Admin/ViewApplication1"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Applications
            </NavLink>
            <NavLink
              to="/Admin/ManageResult"
              className={({ isActive }) => "nav-item nav-link" + (isActive ? " active" : "")}
            >
              Results
            </NavLink>
            <Link
              to="#"
              onClick={logout}
              className="nav-item nav-link text-danger fw-bold ms-lg-2"
            >
              LogOut
            </Link>
          </div>
        </div>
      </nav>
    </>
  )
}