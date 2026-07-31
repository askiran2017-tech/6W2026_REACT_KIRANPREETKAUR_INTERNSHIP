import { Link } from "react-router-dom"
import ResultServices from "../../../Services/ResultServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"

import AuthServices from "../../../Services/AuthServices"
import ApplicationServices from "../../../Services/ApplicationServices"
import InternshipServices from "../../../Services/InternshipServices"
import HackathonServices from "../../../Services/HackathonServices"

export default function ViewResult() {

  const [Result, setResult] = useState([])
  const [applications, setApplications] = useState([])
  const [internships, setInternships] = useState([])
  const [hackathons, setHackathons] = useState([])

  async function getResult() {
    const currentUserId = AuthServices.getId();
    if (!currentUserId) return;

    const [res, appRes, intRes, hackRes] = await Promise.all([
      ResultServices.all(),
      ApplicationServices.all(),
      InternshipServices.all(),
      HackathonServices.all()
    ]);

    // Filter results to only show the logged-in user's results
    const userApps = appRes.filter(app => app.userId === currentUserId);
    const userAppIds = userApps.map(app => app.id);
    const userResults = res.filter(r => userAppIds.includes(r.applicationId));

    setResult(userResults);
    setApplications(userApps);
    setInternships(intRes);
    setHackathons(hackRes);
  }
  useEffect(() => {
    getResult()
  }, [])


  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">

          <h1 className="display-3 text-white mb-3 animated slideInDown">Result</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Result
              </li>
            </ol>
          </nav>

        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success"> Result List</h1>

        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center g-5">
          {Result.map((item) => (
            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
              <div className="card shadow h-100 border-0 rounded-3">

                <div className="card-body">
                  <h4 className="card-title text-primary fw-bold ">
                    {(() => {
                        const app = applications.find(a => a.id === item.applicationId);
                        if (!app) return "Unknown Application";
                        if (app.internshipId) {
                            return "Internship: " + (internships.find(i => i.id === app.internshipId)?.title || "Unknown");
                        } else if (app.hackathonId) {
                            return "Hackathon: " + (hackathons.find(h => h.id === app.hackathonId)?.title || "Unknown");
                        }
                        return "Unknown Program";
                    })()}
                  </h4>
                  <hr />
                  <p>
                    <strong>Result:</strong> {item.result}
                  </p>
                  <p>
                    <strong>Remarks:</strong>  {item.remarks}
                  </p>
                  <p>
                    <strong>PublishedAt:</strong>  {item.publishedAt}
                  </p>
                 

                  <button className="btn btn-success w-100 disabled">
                    {item.result}
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}