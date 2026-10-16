import { Link } from "react-router-dom"
import InternshipServices from "../../../Services/InternshipServices"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import {BounceLoader}from "react-spinners"
const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


export default function ManageInternship() {
  let [loading, setLoading] = useState(false);
  const [Internship, setInternship] = useState([])
  const [categories, setCategories] = useState([])

  function formatDate(dateVal) {
    if (!dateVal) return "-";
    if (dateVal.toDate) {
      return dateVal.toDate().toLocaleDateString();
    }
    return new Date(dateVal).toLocaleDateString();
  }
  
  async function getInternship() {
  try {
    setLoading(true);

    const res = await InternshipServices.all();
    const catRes = await CategoryServices.all();
    console.log("response:", res);

    setInternship(res);
    setCategories(catRes);
  } catch (error) {
    console.log(error);
    toast.error("Failed to load internships");
  } finally {
    setLoading(false);
  }
}
  useEffect(() => {
    getInternship()
  }, [])
  async function deleteInternship(id) {
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
      await InternshipServices.deleteIntern(id)
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      toast.success("Internship deleted successfully")
      getInternship()
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
          <Link to='/Admin/AddInternship'>
            <button
              className="btn border-secondary py-3 bg-success text-white  "
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Internship List
            </button>
          </Link>
        </div>
      </div>
      <div className="container-fluid py-5">
        <div className="container py-5">
          {loading ? (
            <BounceLoader
              color={"#0de114"}
              loading={loading}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sr.No.</th>
                    <th scope="col">Category</th>
                    <th scope="col">CompanyName</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Duration</th>
                    <th scope="col">Stipend</th>
                    <th scope="col">Location</th>
                    <th scope="col">LastDate</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Internship.length === 0 ? (
                    <tr>
                      <td colSpan="11" className="text-center py-4">
                        No internships found.
                      </td>
                    </tr>
                  ) : (
                    Internship.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          <p className="mb-0 mt-4">{index + 1}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">
                            {categories.find(c => c.id === item.categoryId)?.name || item.categoryId}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{item.companyName}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{item.title}</p>
                        </td>
                        <td>
                          <p
                            className="mb-0 mt-4 text-truncate"
                            style={{ maxWidth: "200px" }}
                            title={item.description}
                          >
                            {item.description}
                          </p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{item.duration}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">₹{item.stipend}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{item.location}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{item.lastDate}</p>
                        </td>
                        <td>
                          <p className="mb-0 mt-4">{formatDate(item.createdAt)}</p>
                          <p className="mb-0 mt-4">{formatDate(item.updatedAt)}</p>
                        </td>
                        <td>
                          <Link to={`/Admin/Internship/EditInternship/${item.id}`}>
                            <button className="btn btn-md rounded-circle bg-light border mt-4">
                              <i className="bi bi-pencil text-success" />
                            </button>
                          </Link>
                          &nbsp;
                          <button
                            className="btn btn-md rounded-circle bg-light border mt-4"
                            onClick={() => deleteInternship(item.id)}
                          >
                            <i className="bi bi-trash text-danger" />
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