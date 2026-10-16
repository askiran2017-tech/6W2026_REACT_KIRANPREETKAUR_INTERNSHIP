import { Link } from "react-router-dom"
import ApplicationServices from "../../../Services/ApplicationServices"
import InternshipServices from "../../../Services/InternshipServices"
import HackathonServices from "../../../Services/HackathonServices"
import StudentServices from "../../../Services/StudentServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import { RiseLoader } from "react-spinners"

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export default function ViewApplication1() {
  let [loading, setLoading] = useState(false)
  const [Application, setApplication] = useState([])
  const [users, setUsers] = useState([])
  const [internships, setInternships] = useState([])
  const [hackathons, setHackathons] = useState([])

  async function getApplication() {
      try {
          setLoading(true);
          const [res, usersRes, intRes, hackRes] = await Promise.all([
              ApplicationServices.all(),
              StudentServices.all(),
              InternshipServices.all(),
              HackathonServices.all()
          ]);
          setApplication(res);
          setUsers(usersRes);
          setInternships(intRes);
          setHackathons(hackRes);
      } catch (error) {
          console.log(error);
          toast.error("Failed to load application data");
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
      Swal.fire("Deleted!", "Application deleted.", "success");
      getApplication()
    }
  }

  async function updateStatus(id, status) {
      try {
          await ApplicationServices.update(id, { applicationStatus: status, updatedAt: new Date() });
          toast.success(`Application marked as ${status}`);
          getApplication();
      } catch (err) {
          toast.error("Failed to update status");
      }
  }

  async function scheduleInterview(id) {
      const { value: formValues } = await Swal.fire({
        title: "Schedule Interview",
        html:
          '<input id="swal-input1" class="swal2-input" type="date">' +
          '<input id="swal-input2" class="swal2-input" type="time">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("swal-input1").value,
            document.getElementById("swal-input2").value
          ];
        }
      });
      if (formValues && formValues[0] && formValues[1]) {
          try {
              await ApplicationServices.update(id, {
                  interviewDate: formValues[0],
                  interviewTime: formValues[1],
                  applicationStatus: "Interview Scheduled",
                  updatedAt: new Date()
              });
              toast.success("Interview scheduled successfully!");
              getApplication();
          } catch (err) {
              toast.error("Failed to schedule interview.");
          }
      }
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Manage Applications</h1>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          {loading ? (
            <RiseLoader color={"#0de114"} cssOverride={override} size={15} />
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Type / Title</th>
                    <th scope="col">Submission URL</th>
                    <th scope="col">Interview</th>
                    <th scope="col">Status</th>
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
                          <small>
                            {users.find((u) => u.id === app.userId)?.name || app.userId}
                          </small>
                        </td>
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
                            <a
                              href={app.submissionUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-sm btn-outline-primary"
                            >
                              View
                            </a>
                          ) : (
                            "N/A"
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
                                : "bg-secondary"
                            }`}
                          >
                            {app.applicationStatus || "Pending"}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex flex-column gap-2">
                            <button className="btn btn-sm btn-success" onClick={() => updateStatus(app.id, "Approved")}>
                              Approve
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => updateStatus(app.id, "Rejected")}>
                              Reject
                            </button>
                            <button className="btn btn-sm btn-info text-white" onClick={() => scheduleInterview(app.id)}>
                              Schedule Interview
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteApplication(app.id)}>
                              Delete
                            </button>
                          </div>
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