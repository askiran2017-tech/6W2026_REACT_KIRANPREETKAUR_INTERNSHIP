import { Link } from "react-router-dom"
export default function AdminHeader(){
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
  <Link
    to="index.html"
    className="navbar-brand d-flex align-items-center text-center py-0 px-4 px-lg-5"
  >
    <h1 className="m-0 text-primary">ADMIN PANEL</h1>
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
    <div className="navbar-nav ms-auto p-4 p-lg-0">
      
      
      <Link to="ManageStudent" className="nav-item nav-link">
        Manage Student
      </Link>
      <Link to="ManageCategory" className="nav-item nav-link">
        Manage Category
      </Link>
      <Link to="ManageInternship" className="nav-item nav-link">
        Manage Internship
      </Link>
       <Link to="ManageHackathon" className="nav-item nav-link">
        Manage Hackathon
      </Link>
      <Link to="ViewApplication1" className="nav-item nav-link">
        View Application
      </Link>
      <Link to="ManageResult" className="nav-item nav-link">
        Manage Result
      </Link>
      <Link to="Dashboard" className="nav-item nav-link">
        Dashboard
      </Link>
      <Link to="LogOut" className="nav-item nav-link active">
        LogOut
      </Link>
      
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