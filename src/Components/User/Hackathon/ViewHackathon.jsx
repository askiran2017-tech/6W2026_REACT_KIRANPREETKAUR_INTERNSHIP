import { Link, useNavigate } from "react-router-dom"
import HackathonServices from "../../../Services/HackathonServices"
import ApplicationServices from "../../../Services/ApplicationServices"
import AuthServices from "../../../Services/AuthServices"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export default function ViewHackathon() {
  const [Hackathon, setHackathon] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate();

  async function getHackathon() {
    let res = await HackathonServices.all()
    let catRes = await CategoryServices.all()
    setHackathon(res)
    setCategories(catRes)
  }

  useEffect(() => {
    getHackathon()
  }, [])

  async function AddApplication(hackathonId) {
      try {
          const currentUserId = AuthServices.getId();
          if (!currentUserId) {
              toast.error("Please login first to apply!");
              navigate("/");
              return;
          }
          let payload = {
              userId: currentUserId,
              internshipId: "",
              hackathonId: hackathonId,
              submissionUrl: "",
              interviewDate: "",
              interviewTime: "",
              applicationStatus: "Pending",
              createdAt: new Date(),
              updatedAt: new Date()
          }
          await ApplicationServices.add(payload)
          toast.success("Successfully registered for Hackathon!");
          navigate("/ManageApplication");
      } catch (err) {
          console.log("error:", err)
          toast.error("Error applying for Hackathon")
      }
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">

          <h1 className="display-3 text-white mb-3 animated slideInDown">Hackathon</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Hackathon
              </li>
            </ol>
          </nav>

        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success"> Hackathon List</h1>
        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center g-5">
                     {Hackathon.map((item) => (
                        <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h4 className="text-primary">
                                        {item.title}
                                    </h4><hr/>
                  <p><strong>Category:</strong> {categories.find(c => c.id === item.categoryId)?.name || item.categoryId}</p>
                  <p><strong>Description:</strong> {item.description}</p>
                  <p><strong>Venue:</strong> {item.venue}</p>
                  <p><strong>Event Date:</strong> {item.eventDate}</p>
                  <p><strong>Last Date:</strong> {item.lastDate}</p>
                  <p><strong>Prize:</strong> ₹{item.prize}</p>
                  <p><strong>Created At:</strong> {item.createdAt?.toDate().toLocaleDateString()}</p>
                  <button className="btn btn-success w-100" onClick={() => AddApplication(item.id)}>
                    Register Now
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