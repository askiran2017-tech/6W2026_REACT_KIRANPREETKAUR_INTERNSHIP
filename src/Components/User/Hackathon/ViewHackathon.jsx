import { Link, useNavigate } from "react-router-dom"
import HackathonServices from "../../../Services/HackathonServices"
import ApplicationServices from "../../../Services/ApplicationServices"
import AuthServices from "../../../Services/AuthServices"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ViewHackathon() {
  const [hackathons, setHackathons] = useState([])
  const [categories, setCategories] = useState([])
  const [registeredIds, setRegisteredIds] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function formatDate(dateVal) {
    if (!dateVal) return "-";
    if (dateVal.toDate) {
      return dateVal.toDate().toLocaleDateString();
    }
    return new Date(dateVal).toLocaleDateString();
  }

  async function loadData() {
    try {
      setLoading(true);
      const [res, catRes, appRes] = await Promise.all([
        HackathonServices.all(),
        CategoryServices.all(),
        ApplicationServices.all()
      ]);
      setHackathons(res);
      setCategories(catRes);

      const currentUserId = AuthServices.getId();
      if (currentUserId) {
        const userRegistered = appRes
          .filter(a => a.userId === currentUserId && a.hackathonId)
          .map(a => a.hackathonId);
        setRegisteredIds(userRegistered);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load hackathons");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function registerHackathon(hackathonId) {
    try {
      const currentUserId = AuthServices.getId();
      if (!currentUserId) {
        toast.error("Please login first to apply!");
        navigate("/");
        return;
      }
      if (registeredIds.includes(hackathonId)) {
        toast.info("You have already registered for this hackathon.");
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
      setRegisteredIds([...registeredIds, hackathonId]);
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
          <h1 className="display-3 text-white mb-3 animated slideInDown">Hackathons</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Hackathons
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success">Available Hackathons</h1>
        </div>
      </div>

      <div className="container py-5">
        {loading ? (
          <BeatLoader color="#0de114" loading={loading} cssOverride={override} size={15} />
        ) : hackathons.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No hackathons available currently.</h4>
          </div>
        ) : (
          <div className="row justify-content-center g-5">
            {hackathons.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card shadow h-100 border-0 rounded-3">
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title text-primary fw-bold">
                      {item.title}
                    </h4>
                    <hr />
                    <p>
                      <strong>Category:</strong> {categories.find(c => c.id === item.categoryId)?.name || item.categoryId}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Venue:</strong> {item.venue}
                    </p>
                    <p>
                      <strong>Event Date:</strong> {item.eventDate}
                    </p>
                    <p>
                      <strong>Last Date:</strong> {item.lastDate}
                    </p>
                    <p>
                      <strong>Prize:</strong> ₹{item.prize}
                    </p>
                    <p>
                      <strong>Created At:</strong> {formatDate(item.createdAt)}
                    </p>
                    <div className="mt-auto">
                      {registeredIds.includes(item.id) ? (
                        <button className="btn btn-secondary w-100" disabled>
                          Already Registered
                        </button>
                      ) : (
                        <button className="btn btn-success w-100" onClick={() => registerHackathon(item.id)}>
                          Register Now
                        </button>
                      )}
                    </div>
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