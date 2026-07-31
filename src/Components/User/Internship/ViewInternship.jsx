import { Link, useNavigate } from "react-router-dom"
import InternshipServices from "../../../Services/InternshipServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import ApplicationServices from "../../../Services/ApplicationServices";
import AuthServices from "../../../Services/AuthServices";
import CategoryServices from "../../../Services/CategoryServices";

export default function ViewInternship() {

  const [Internship, setInternship] = useState([])
  const [categories, setCategories] = useState([])
  async function getInternship() {
    let res = await InternshipServices.all()
    let catRes = await CategoryServices.all()
    console.log("response:", res)
    setInternship(res)
    setCategories(catRes)
  }
  useEffect(() => {
    getInternship()
  }, [])
  
  const [UserId, setUserId] = useState("");
      const [InternshipId, setInternshipId] = useState("");
      const [HackathonId, setHackathonId] = useState("");
      const [SubmissionUrl, setSubmissionUrl] = useState("");
      const [InterviewDate, setInterviewDate] = useState("");
      const [InterviewTime, setInterviewTime] = useState("");
      const [ApplicationStatus, setApplicationStatus] = useState("");
      const navigate = useNavigate();
  
      async function AddApplication(internshipId) {
        try {
              const currentUserId = AuthServices.getId();
              if (!currentUserId) {
                  toast.error("Please login first to apply!");
                  navigate("/");
                  return;
              }
              let payload = {
                  userId: currentUserId,
                  internshipId: internshipId,
                  hackathonId: "",
                  submissionUrl: "",
                  interviewDate: "",
                  interviewTime: "",
                  applicationStatus: "Pending",
                  createdAt: new Date(),
                  updatedAt: new Date()
              }
              await ApplicationServices.add(payload)
              toast.success("Successfully applied for Internship!");
              navigate("/ManageApplication");
          } catch (err) {
              console.log("error:", err)
              toast.error("Error applying for Internship")
          }
      }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">

          <h1 className="display-3 text-white mb-3 animated slideInDown">Internship</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Internship
              </li>
            </ol>
          </nav>

        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success"> Internship List</h1>
          
        </div>
      </div>
      <div className="container py-5">
  <div className="row justify-content-center g-5">
    {Internship.map((item) => (
      <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
        <div className="card shadow h-100 border-0 rounded-3">
           
          <div className="card-body">
            <h4 className="card-title text-primary fw-bold">
              {item.title}
            </h4>
            <hr />
            <p>
              <strong>CompanyName:</strong> {item.companyName}
            </p>
            <p>
              <strong>Description:</strong>  {item.description}
            </p>
            <p>
              <strong>Category:</strong> {categories.find(c => c.id === item.categoryId)?.name || item.categoryId}
            </p>

            <p>
              <strong>📍 Location:</strong> {item.location}
            </p>

            <p>
              <strong>⏳ Duration:</strong> {item.duration}
            </p>

            <p>
              <strong>💰 Stipend:</strong> ₹{item.stipend}
            </p>

            <p>
              <strong>📅 Last Date:</strong> {item.lastDate}
            </p>

            <button className="btn btn-success w-100" onClick={()=>{AddApplication(item.id)}}>
              Apply Now
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