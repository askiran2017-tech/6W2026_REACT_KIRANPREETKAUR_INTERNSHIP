import { Link } from "react-router-dom"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import {BeatLoader}from "react-spinners"
const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function ManageCategory() {
  const [Category, setCategory] = useState([])
  let[loading,setLoading]=useState(false)
  async function getCategory() {
    try {
      setLoading(true);
  
      const res = await CategoryServices.all();
      console.log("response:", res);
  
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
  async function deleteCategory(id){
    const result = await Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
})
  if (result.isConfirmed){
    await CategoryServices.deleteCategory(id)
    await Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
  toast.success("Category deleted successfully")
  getCategory()
    }}

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
              className="btn border-secondary py-3 bg-success text-white  "
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Category List
            </button>
          </Link>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
           {loading?(<BeatLoader
        color={"#0de114"}
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"/>):(
          <div className="table-responsive">
            <table className="table">
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
                {Category.map((Category, index) => (
                  <tr key={Category.id}>

                    <td>
                      <p className="mb-0 mt-4">{index + 1}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Category.name}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Category.description}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Category.createdAt.toDate().toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Category.updatedAt.toDate().toLocaleDateString()}</p>
                    </td>

                    <td>
                      <Link to={`/Admin/Category/EditCategory/${Category.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-success" />
                        </button>
                      </Link>
                      &nbsp;
                      <button className="btn btn-md rounded-circle bg-light border mt-4"
                        onClick={() => deleteCategory(Category.id)}>
                        <i className="bi bi-trash text-danger" />
                      </button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
          </div>)}

        </div>
      </div>

    </>
  )
}