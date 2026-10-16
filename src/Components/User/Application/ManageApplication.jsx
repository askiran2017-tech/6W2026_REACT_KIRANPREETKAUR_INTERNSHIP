import { Link } from "react-router-dom"
import ApplicationServices from "../../../Services/ApplicationServices"
import InternshipServices from "../../../Services/InternshipServices"
import HackathonServices from "../../../Services/HackathonServices"
import AuthServices from "../../../Services/AuthServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import { RingLoader } from "react-spinners"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function ManageApplication() {
  const [Application, setApplication] = useState([])
  const [internships, setInternships] = useState([])
  const [hackathons, setHackathons] = useState([])
  let [loading, setLoading] = useState(false)

  function formatDate(dateVal) {
    if (!dateVal) return "-";
    if (dateVal.toDate) {
      return dateVal.toDate().toLocaleDateString();
    }
    return new Date(dateVal).toLocaleDateString();
  }

  async function getApplication() {
      try {
          setLoading(true);
          const currentUserId = AuthServices.getId();
          if (!currentUserId) return;

          const [res, intRes, hackRes] = await Promise.all([
              ApplicationServices.all(),
              InternshipServices.all(),
              HackathonServices.all()
          ]);
          
          const userApps = res.filter(app => app.userId === currentUserId);
          setApplication(userApps);
          setInternships(intRes);
          setHackathons(hackRes);
      } catch (error) {
          console.log(error);
          toast.error("Failed to load application");
      } finally {
          setLoading(false);
      }
  }

  useEffect(() => {
    getApplication()
  }, [])

  async function deleteApplication(id) {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    })
    if (result.isConfirmed) {
      await ApplicationServices.deleteApplication(id)
      Swal.fire("Deleted!", "Your application has been deleted.", "success");
      getApplication()
    }
  }

  async function submitProject(id) {
      const { value: url } = await Swal.fire({
        title: "Submit Project URL",
        input: "url",
        inputLabel: "Your project or resume link",
        inputPlaceholder: "Enter the URL"
      });
      if (url) {
          try {
              await ApplicationServices.update(id, { submissionUrl: url, updatedAt: new Date() });
              toast.success("Project submitted successfully!");
              getApplication();
          } catch (err) {
              toast.error("Failed to submit project.");
          }
      }
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">
          <h1 className="display-3 text-white mb-3 animated slideInDown">My Applications</h1>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          {loading ? (
            <RingLoader color={"#0de114"} cssOverride={override} size={25} />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Type / Title</th>
                    <th scope="col">Submission URL</th>
                    <th scope="col">Interview</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Application.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No applications found.
                      </td>
                    </tr>
                  ) : (
                    Application.map((app) => (
                      <tr key={app.id}>
                        <td>
                          {app.internshipId ? (
                            <span className="badge bg-success">
                              Internship: {internships.find((i) => i.id === app.internshipId)?.title || app.internshipId}
                            </span>
                          ) : (
                            <span className="badge bg-warning text-dark">
                              Hackathon: {hackathons.find((h) => h.id === app.hackathonId)?.title || app.hackathonId}
                            </span>
                          )}
                        </td>
                        <td>
                          {app.submissionUrl ? (
                            <div className="d-flex align-items-center gap-2">
                              <a
                                href={app.submissionUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-sm btn-outline-primary"
                              >
                                View Link
                              </a>
                              <button
                                className="btn btn-sm btn-outline-secondary"
                                onClick={() => submitProject(app.id)}
                              >
                                Edit
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm btn-info text-white"
                              onClick={() => submitProject(app.id)}
                            >
                              Submit Link
                            </button>
                          )}
                        </td>
                        <td>
                          {app.interviewDate ? (
                            <div>
                              <strong>Date:</strong> {app.interviewDate}<br />
                              <strong>Time:</strong> {app.interviewTime}
                            </div>
                          ) : (
                            "Not Scheduled"
                          )}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              app.applicationStatus === "Approved"
                                ? "bg-success"
                                : app.applicationStatus === "Rejected"
                                ? "bg-danger"
                                : app.applicationStatus === "Interview Scheduled"
                                ? "bg-info text-dark"
                                : "bg-warning text-dark"
                            }`}
                          >
                            {app.applicationStatus || "Pending"}
                          </span>
                        </td>
                        <td>
                          <small>Applied: {formatDate(app.createdAt)}</small><br />
                          <small>Updated: {formatDate(app.updatedAt)}</small>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteApplication(app.id)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  )
}