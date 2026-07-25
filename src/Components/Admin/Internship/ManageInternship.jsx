import { Link } from "react-router-dom"
import InternshipServices from "../../../Services/InternshipServices"
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
  
  async function getInternship() {
  try {
    setLoading(true);

    const res = await InternshipServices.all();
    console.log("response:", res);

    setInternship(res);
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
          {loading?(<BounceLoader
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
                    <th scope="col">CategoryId</th>
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
                  {Internship.map((Internship, index) => (
                    <tr key={Internship.id}>

                      <td>
                        <p className="mb-0 mt-4">{index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.categoryId}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.companyName}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.title}</p>
                      </td>
                      <td>
                      <p
                        className="mb-0 mt-4 text-truncate"
                        style={{ maxWidth: "200px" }}
                        title={Internship.description}
                      >
                        {Internship.description}
                      </p>
                    </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.duration}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">₹{Internship.stipend}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.location}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.lastDate}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{Internship.createdAt.toDate().toLocaleDateString()}</p>
                        <p className="mb-0 mt-4">{Internship.updatedAt.toDate().toLocaleDateString()}</p>
                      </td>

                      <td>
                        <Link to={`/Admin/Internship/EditInternship/${Internship.id}`}>
                          <button className="btn btn-md rounded-circle bg-light border mt-4">
                            <i className="bi bi-pencil text-success" />
                          </button>
                        </Link>
                        &nbsp;
                        <button className="btn btn-md rounded-circle bg-light border mt-4"
                          onClick={() => deleteInternship(Internship.id)}>
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