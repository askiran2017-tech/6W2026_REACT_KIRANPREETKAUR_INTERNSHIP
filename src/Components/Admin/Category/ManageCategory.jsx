import { Link } from "react-router-dom"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import { BeatLoader } from "react-spinners"

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageCategory() {
  const [Category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)

  function formatDate(dateVal) {
    if (!dateVal) return "-";
    if (dateVal.toDate) {
      return dateVal.toDate().toLocaleDateString();
    }
    return new Date(dateVal).toLocaleDateString();
  }

  async function getCategory() {
    try {
      setLoading(true);
      const res = await CategoryServices.all();
      setCategory(res);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load Category");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  async function deleteCategory(id) {
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
      await CategoryServices.deleteCategory(id)
      await Swal.fire({
        title: "Deleted!",
        text: "Your category has been deleted.",
        icon: "success"
      });
      toast.success("Category deleted successfully")
      getCategory()
    }
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Category</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Category
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success">All Categories List</h1>
          <Link to='/Admin/AddCategory'>
            <button
              className="btn border-secondary py-3 bg-success text-white"
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Category
            </button>
          </Link>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          {loading ? (
            <div className="text-center py-5">
              <BeatLoader
                color={"#0de114"}
                loading={loading}
                cssOverride={override}
                size={15}
                aria-label="Loading Spinner"
              />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead>
                  <tr>
                    <th scope="col">Sr.No.</th>
                    <th scope="col">Category Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">CreatedAt</th>
                    <th scope="col">UpdatedAt</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Category.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-muted">
                        No categories found. Click "Add Category" to create one.
                      </td>
                    </tr>
                  ) : (
                    Category.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          <p className="mb-0">{index + 1}</p>
                        </td>
                        <td>
                          <p className="mb-0 fw-bold">{item.name}</p>
                        </td>
                        <td>
                          <p className="mb-0">{item.description}</p>
                        </td>
                        <td>
                          <p className="mb-0">{formatDate(item.createdAt)}</p>
                        </td>
                        <td>
                          <p className="mb-0">{formatDate(item.updatedAt)}</p>
                        </td>
                        <td>
                          <Link to={`/Admin/Category/EditCategory/${item.id}`}>
                            <button className="btn btn-sm rounded-circle bg-light border me-2">
                              <i className="bi bi-pencil text-success" />
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm rounded-circle bg-light border"
                            onClick={() => deleteCategory(item.id)}
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