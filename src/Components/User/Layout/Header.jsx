import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import AuthServices from "../../../Services/AuthServices"
export default function Header(){
  const nav=useNavigate();
  const[email,setEmail]=useState('')
  useEffect(()=>{
    let res=AuthServices.getEmail()
    setEmail(res);
  })
  function logOut(){
  AuthServices.logOut()
  toast.success("logout successfully")
  nav("ViewCategory")}
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
  <Link
    to="index.html"
    className="navbar-brand d-flex align-items-center text-center py-0 px-3 px-md-5"
  >
    <h1 className="m-0 text-primary">User PANEL</h1>
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
      <Link to="ViewCategory" className="nav-item nav-link">
        view Category
      </Link>
      <Link to="ViewInternship" className="nav-item nav-link">
        view Internship
      </Link>
       <Link to="ViewHackathon" className="nav-item nav-link">
        view Hackathon
      </Link>
       
      <Link to="ManageApplication" className="nav-item nav-link">
        Manage Application
      </Link>
      <Link to="ViewResult" className="nav-item nav-link">
        view Result
      </Link>
      {email?(
       <Link to="/" className="nav-item nav-link active" onClick={logOut}>
        LogOut
      </Link>):(<>
      <Link to="/" className="nav-item nav-link active">
        Login
      </Link>
       
      <Link to="Register" className="nav-item nav-link">
        Register
      </Link></>)}

      
      </div>
      </div>
      
      
      {/* <div className="nav-item dropdown">
        <Link
          to="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Jobs
        </Link>
        <div className="dropdown-menu rounded-0 m-0">
          <Link to="job-list.html" className="dropdown-item">
            Job List
          </Link>
          <Link to="job-detail.html" className="dropdown-item">
            Job Detail
          </Link>
          
        </div>
      </div>
      <div className="nav-item dropdown">
        <Link
          to="#"
          className="nav-link dropdown-toggle"
          data-bs-toggle="dropdown"
        >
          Pages
        </Link>
        <div className="dropdown-menu rounded-0 m-0">
          <Link to="category.html" className="dropdown-item">
            Job Category
          </Link>
          <Link to="testimonial.html" className="dropdown-item">
            Testimonial
          </Link>
          <Link to="404.html" className="dropdown-item">
            404
          </Link>
        </div>
      </div>
      <Link to="contact.html" className="nav-item nav-link">
        Contact
      </Link>
    </div>
    <Link
      to=""
      className="btn btn-primary rounded-0 py-4 px-lg-5 d-none d-lg-block"
    >
      Post A Job
      <i className="fa fa-arrow-right ms-3" />
    </Link>
  // </div> */}
</nav>

        </>
    )
}