import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <>
      <div
        className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container py-5">
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Portal Info</h5>
              <Link className="btn btn-link text-white-50" to="/ViewInternship">
                Internships
              </Link>
              <Link className="btn btn-link text-white-50" to="/ViewHackathon">
                Hackathons
              </Link>
              <Link className="btn btn-link text-white-50" to="/ViewCategory">
                Categories
              </Link>
              <Link className="btn btn-link text-white-50" to="/ManageApplication">
                My Applications
              </Link>
              <Link className="btn btn-link text-white-50" to="/Profile">
                My Profile
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Quick Links</h5>
              <Link className="btn btn-link text-white-50" to="/ViewCategory">
                Browse Categories
              </Link>
              <Link className="btn btn-link text-white-50" to="/ViewInternship">
                Browse Internships
              </Link>
              <Link className="btn btn-link text-white-50" to="/ViewHackathon">
                Browse Hackathons
              </Link>
              <Link className="btn btn-link text-white-50" to="/ManageApplication">
                Track Status
              </Link>
              <Link className="btn btn-link text-white-50" to="/ViewResult">
                Check Results
              </Link>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Contact</h5>
              <p className="mb-2">
                <i className="fa fa-map-marker-alt me-3" />
                Student Career Center
              </p>
              <p className="mb-2">
                <i className="fa fa-phone-alt me-3" />
                +91 98765 43210
              </p>
              <p className="mb-2">
                <i className="fa fa-envelope me-3" />
                support@portal.com
              </p>
              <div className="d-flex pt-2">
                <Link className="btn btn-outline-light btn-social" to="/ViewInternship">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/ViewInternship">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/ViewInternship">
                  <i className="fab fa-youtube" />
                </Link>
                <Link className="btn btn-outline-light btn-social" to="/ViewInternship">
                  <i className="fab fa-linkedin-in" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <h5 className="text-white mb-4">Newsletter</h5>
              <p>Stay updated with latest internships and hackathon announcements.</p>
              <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                <input
                  className="form-control bg-transparent w-100 py-3 ps-4 pe-5"
                  type="email"
                  placeholder="Your email"
                />
                <button
                  type="button"
                  className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                >
                  Subscribe
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
                <Link className="border-bottom" to="/ViewInternship">
                  Student Internship &amp; Hackathon Portal
                </Link>
                , All Rights Reserved.
              </div>
              <div className="col-md-6 text-center text-md-end">
                <div className="footer-menu">
                  <Link to="/ViewInternship">Home</Link>
                  <Link to="/ViewCategory">Categories</Link>
                  <Link to="/ViewHackathon">Hackathons</Link>
                  <Link to="/ManageApplication">Applications</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}