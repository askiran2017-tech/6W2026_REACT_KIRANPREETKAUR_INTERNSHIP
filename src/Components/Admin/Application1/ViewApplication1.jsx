import { Link } from "react-router-dom"
import ApplicationServices from "../../../Services/ApplicationServices"
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
   async function getApplication() {
          try {
              setLoading(true);
  
              const res = await ApplicationServices.all();
              console.log("response:", res);
  
              setApplication(res);
          } catch (error) {
              console.log(error);
              toast.error("Failed to load application");
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
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      toast.success("Application deleted successfully")
      getApplication()
    }
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">

          <h1 className="display-3 text-white mb-3 animated slideInDown">Application</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Application
              </li>
            </ol>
          </nav>

        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success"> Application List</h1>
          
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          {loading ? (<RiseLoader
                        color={"#0de114"}
                        loading={loading}
                        cssOverride={override}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader" />) : (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr.No.</th>
                  <th scope="col">UserId</th>
                  <th scope="col">InternshipId</th>
                  <th scope="col">HackathonId</th>
                  <th scope="col">SubmissionUrl</th>
                  <th scope="col">InterviewDate</th>
                  <th scope="col">InterviewTime</th>
                  <th scope="col">ApplicationStatus</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">updatedAt</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {Application.map((Application, index) => (
                  <tr key={Application.id}>

                    <td>
                      <p className="mb-0 mt-4">{index + 1}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.userId}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.internshipId}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.hackathonId}</p>
                    </td><td>
                    <Link
                      to={Application.submissionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                     Submit Now
                    </Link></td>
                    <td>
                      <p className="mb-0 mt-4">{Application.interviewDate}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.interviewTime}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.applicationStatus}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.createdAt.toDate().toLocaleDateString()}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Application.updatedAt.toDate().toLocaleDateString()}</p>
                    </td>

                    <td>
                      <Link to={`/Application/EditApplication/${Application.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-success" />
                        </button>
                      </Link>
                      &nbsp;
                      <button className="btn btn-md rounded-circle bg-light border mt-4"
                        onClick={() => deleteApplication(Application.id)}>
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