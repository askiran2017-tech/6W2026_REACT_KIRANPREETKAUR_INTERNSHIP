import { Link } from "react-router-dom"

export default function AdminFooter() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Management</h5>
              <Link className="btn btn-link text-white-50" to="/Admin/Dashboard">
                Dashboard
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/ManageStudent">
                Manage Students
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/ManageCategory">
                Manage Categories
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/ManageInternship">
                Manage Internships
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/ManageHackathon">
                Manage Hackathons
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <Link className="btn btn-link text-white-50" to="/Admin/ViewApplication1">
                View Applications
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/ManageResult">
                Manage Results
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/AddInternship">
                Add Internship
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/AddHackathon">
                Add Hackathon
              </Link>
              <Link className="btn btn-link text-white-50" to="/Admin/AddCategory">
                Add Category
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Admin Contact</h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Administrator Headquarters
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +91 98765 43210
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                admin@portal.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="/Admin/Dashboard">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/Admin/Dashboard">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/Admin/Dashboard">
                  <i className="fab fa-youtube" />
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/Admin/Dashboard">
                  <i className="fab fa-linkedin-in" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">System Updates</h5>
              <p>Automated notifications and updates for administrators.</p>
              <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                <input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="email"
                  placeholder="Admin email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="copyright">
            <div className="row">
              <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                ©{" "}
                <Link className="border-bottom" to="/Admin/Dashboard">
                  Admin Portal - Internship &amp; Hackathon Management
                </Link>
                , All Rights Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link to="/Admin/Dashboard">Dashboard</Link>
                  <Link to="/Admin/ManageStudent">Students</Link>
                  <Link to="/Admin/ManageInternship">Internships</Link>
                  <Link to="/Admin/ViewApplication1">Applications</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}