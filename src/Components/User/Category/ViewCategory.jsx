import { Link } from "react-router-dom"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import { BeatLoader } from "react-spinners"

const override = {
  display: "block",
  margin: "0 auto",
};

export default function ViewCategory() {
  const [Category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)

  async function getCategory() {
    try {
      setLoading(true)
      let res = await CategoryServices.all()
      setCategory(res)
    } catch (error) {
      console.log("Error loading categories:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Categories</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Categories
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mt-4">
        <div className="text-center mb-5">
          <h1 className="text-primary fw-bold">Explore By Category</h1>
          <p className="text-muted">Browse opportunities curated across different specializations</p>
        </div>
      </div>

      <div className="container pb-5">
        {loading ? (
          <div className="text-center py-5">
            <BeatLoader
              color={"#0b5ed7"}
              loading={loading}
              cssOverride={override}
              size={15}
              aria-label="Loading Spinner"
            />
          </div>
        ) : Category.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <h4>No categories available right now.</h4>
            <p>Please check back later.</p>
          </div>
        ) : (
          <div className="row justify-content-center g-4">
            {Category.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div className="card shadow-sm h-100 border-0 rounded-3 p-3">
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <div className="d-flex align-items-center mb-3">
                        <div className="bg-light rounded p-3 me-3 text-primary">
                          <i className="bi bi-folder-fill fs-3 text-primary"></i>
                        </div>
                        <h4 className="text-dark fw-bold mb-0">
                          {item.name}
                        </h4>
                      </div>
                      <hr className="text-muted" />
                      <p className="text-muted mb-4" style={{ minHeight: "60px" }}>
                        {item.description}
                      </p>
                    </div>

                    <div className="text-center mt-3">
                      <Link to="/ViewInternship" className="btn btn-outline-primary w-100 py-2">
                        Browse Internships <i className="bi bi-arrow-right ms-1"></i>
                      </Link>
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