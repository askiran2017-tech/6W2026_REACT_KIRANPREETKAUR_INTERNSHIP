import { Link, useNavigate } from "react-router-dom"
import InternshipServices from "../../../Services/InternshipServices"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"
import ApplicationServices from "../../../Services/ApplicationServices";
import AuthServices from "../../../Services/AuthServices";
import CategoryServices from "../../../Services/CategoryServices";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ViewInternship() {
  const [internships, setInternships] = useState([])
  const [categories, setCategories] = useState([])
  const [appliedIds, setAppliedIds] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  async function loadData() {
    try {
      setLoading(true);
      const [res, catRes, appRes] = await Promise.all([
        InternshipServices.all(),
        CategoryServices.all(),
        ApplicationServices.all()
      ]);
      setInternships(res);
      setCategories(catRes);

      const currentUserId = AuthServices.getId();
      if (currentUserId) {
        const userApplied = appRes
          .filter(a => a.userId === currentUserId && a.internshipId)
          .map(a => a.internshipId);
        setAppliedIds(userApplied);
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to load internships");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  async function applyInternship(internshipId) {
    try {
      const currentUserId = AuthServices.getId();
      if (!currentUserId) {
        toast.error("Please login first to apply!");
        navigate("/");
        return;
      }
      if (appliedIds.includes(internshipId)) {
        toast.info("You have already applied for this internship.");
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
      setAppliedIds([...appliedIds, internshipId]);
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
          <h1 className="display-3 text-white mb-3 animated slideInDown">Internships</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Internships
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success">Available Internships</h1>
        </div>
      </div>

      <div className="container py-5">
        {loading ? (
          <BeatLoader color="#0de114" loading={loading} cssOverride={override} size={15} />
        ) : internships.length === 0 ? (
          <div className="text-center py-5">
            <h4 className="text-muted">No internships available currently.</h4>
          </div>
        ) : (
          <div className="row justify-content-center g-5">
            {internships.map((item) => (
              <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
                <div className="card shadow h-100 border-0 rounded-3">
                  <div className="card-body d-flex flex-column">
                    <h4 className="card-title text-primary fw-bold">
                      {item.title}
                    </h4>
                    <hr />
                    <p>
                      <strong>Company:</strong> {item.companyName}
                    </p>
                    <p>
                      <strong>Description:</strong> {item.description}
                    </p>
                    <p>
                      <strong>Category:</strong> {categories.find(c => c.id === item.categoryId)?.name || item.categoryId}
                    </p>
                    <p>
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p>
                      <strong>Duration:</strong> {item.duration}
                    </p>
                    <p>
                      <strong>Stipend:</strong> ₹{item.stipend}
                    </p>
                    <p>
                      <strong>Last Date:</strong> {item.lastDate}
                    </p>
                    <div className="mt-auto">
                      {appliedIds.includes(item.id) ? (
                        <button className="btn btn-secondary w-100" disabled>
                          Already Applied
                        </button>
                      ) : (
                        <button className="btn btn-success w-100" onClick={() => applyInternship(item.id)}>
                          Apply Now
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