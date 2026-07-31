import { Link, useNavigate, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import AuthServices from "../../../Services/AuthServices"

export default function Header(){
  const nav=useNavigate();
  const location = useLocation();
  const[email,setEmail]=useState('')
  
  useEffect(()=>{
    let res=AuthServices.getEmail()
    setEmail(res);
  }, [location])
  
  function logOut(e){
    e.preventDefault();
    AuthServices.logOut()
    toast.success("logout successfully")
    nav("/")
  }
  
  return(
    <>
    <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
      <Link
        to="/"
        className="navbar-brand d-flex align-items-center text-center py-0 px-3 px-md-5"
      >
        <h1 className="m-0 text-primary">Student PANEL</h1>
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
        <div className="navbar-nav ms-auto p-3 p-md-0">
          <Link to="/ViewCategory" className="nav-item nav-link">
            Categories
          </Link>
          <Link to="/ViewInternship" className="nav-item nav-link">
            Internships
          </Link>
          <Link to="/ViewHackathon" className="nav-item nav-link">
            Hackathons
          </Link>
          
          {email ? (
            <>
              <Link to="/ManageApplication" className="nav-item nav-link">
                My Applications
              </Link>
              <Link to="/ViewResult" className="nav-item nav-link">
                Results
              </Link>
              <Link to="/Profile" className="nav-item nav-link text-primary fw-bold">
                Profile
              </Link>
              <Link to="/" className="nav-item nav-link active" onClick={logOut}>
                LogOut
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="nav-item nav-link active">
                Login
              </Link>
              <Link to="/Register" className="nav-item nav-link">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
    </>
  )
}