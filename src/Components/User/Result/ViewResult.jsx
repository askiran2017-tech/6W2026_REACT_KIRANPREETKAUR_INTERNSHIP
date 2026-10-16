import { Link } from "react-router-dom"
import ResultServices from "../../../Services/ResultServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"
import AuthServices from "../../../Services/AuthServices"
import ApplicationServices from "../../../Services/ApplicationServices"
import InternshipServices from "../../../Services/InternshipServices"
import HackathonServices from "../../../Services/HackathonServices"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ViewResult() {
  const [Result, setResult] = useState([])
  const [applications, setApplications] = useState([])
  const [internships, setInternships] = useState([])
  const [hackathons, setHackathons] = useState([])
  const [loading, setLoading] = useState(false)

  function formatDate(dateVal) {
    if (!dateVal) return "-";
    if (dateVal.toDate) {
      return dateVal.toDate().toLocaleDateString();
    }
    return new Date(dateVal).toLocaleDateString();
  }

  async function getResult() {
    try {
      setLoading(true);
      const currentUserId = AuthServices.getId();
      if (!currentUserId) return;

      const [res, appRes, intRes, hackRes] = await Promise.all([
        ResultServices.all(),
        ApplicationServices.all(),
        InternshipServices.all(),
        HackathonServices.all()
      ]);

      const userApps = appRes.filter(app => app.userId === currentUserId);
      const userAppIds = userApps.map(app => app.id);
      const userResults = res.filter(r => userAppIds.includes(r.applicationId));

      setResult(userResults);
      setApplications(userApps);
      setInternships(intRes);
      setHackathons(hackRes);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load results");
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-success">My Results</h1>
        </div>
      </div>

      <div className="container py-5">
        {loading ? (
          <BeatLoader color="#0de114" loading={loading} cssOverride={override} size={15} />
        ) : Result.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No results published yet for your applications.</h4>
          </div>
        ) : (
          <div className="row justify-content-center g-5">
            {Result.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card shadow h-100 border-0 rounded-3">
                  <div className="card-body">
                    <h4 className="card-title text-primary fw-bold">
                      {(() => {
                        const app = applications.find(a => a.id === item.applicationId);
                        if (!app) return "Application";
                        if (app.internshipId) {
                          return "Internship: " + (internships.find(i => i.id === app.internshipId)?.title || "Unknown");
                        } else if (app.hackathonId) {
                          return "Hackathon: " + (hackathons.find(h => h.id === app.hackathonId)?.title || "Unknown");
                        }
                        return "Program";
                      })()}
                    </h4>
                    <hr />
                    <p>
                      <strong>Result:</strong>{" "}
                      <span className={`badge ${item.result?.toLowerCase().includes("selected") || item.result?.toLowerCase().includes("pass") || item.result?.toLowerCase().includes("winner") ? "bg-success" : "bg-info text-dark"}`}>
                        {item.result}
                      </span>
                    </p>
                    <p>
                      <strong>Remarks:</strong> {item.remarks}
                    </p>
                    <p>
                      <strong>Published Date:</strong> {formatDate(item.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}