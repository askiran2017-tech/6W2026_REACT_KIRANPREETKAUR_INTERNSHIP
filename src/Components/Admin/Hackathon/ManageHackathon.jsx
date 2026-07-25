import { Link } from "react-router-dom"
import HackathonServices from "../../../Services/HackathonServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import {BarLoader}from "react-spinners"
const override= {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageHackathon() {
  const [Hackathon, setHackathon] = useState([])
  let[loading,setLoading]=useState(false)
 async function getHackathon() {
   try {
     setLoading(true);
 
     const res = await HackathonServices.all();
     console.log("response:", res);
 
     setHackathon(res);
   } catch (error) {
     console.log(error);
     toast.error("Failed to load hackathon");
   } finally {
     setLoading(false);
   }
 }
  useEffect(() => {
    getHackathon()
  }, [])
  async function deleteHackathon(id) {
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
      await HackathonServices.deleteHackathon(id)
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      toast.success("Hackathon deleted successfully")
      getHackathon()
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
          <Link to='/Admin/AddHackathon'>
            <button
              className="btn border-secondary py-3 bg-success text-white  "
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Hackathon List
            </button>
          </Link>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
           {loading?(<BarLoader
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
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th scope="col">Venue</th>
                  <th scope="col">EventDate</th>
                  <th scope="col">LastDate</th>
                  <th scope="col">Prize</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>

                </tr>
              </thead>
              <tbody>
                {Hackathon.map((Hackathon, index) => (
                  <tr key={Hackathon.id}>

                    <td>
                      <p className="mb-0 mt-4">{index + 1}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Hackathon.categoryId}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Hackathon.title}</p>
                    </td>
                    <td>
                      <p
                        className="mb-0 mt-4 text-truncate"
                        style={{ maxWidth: "200px" }}
                        title={Hackathon.description}
                      >
                        {Hackathon.description}
                      </p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Hackathon.venue}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Hackathon.eventDate}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Hackathon.lastDate}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">₹{Hackathon.prize}</p>
                    </td>
                    <td>
                      <p className="mb-0 mt-4">{Hackathon.createdAt.toDate().toLocaleDateString()}</p>
                      <p className="mb-0 mt-4">{Hackathon.updatedAt.toDate().toLocaleDateString()}</p>
                    </td>

                    <td>
                      <Link to={`/Admin/Hackathon/EditHackathon/${Hackathon.id}`}>
                        <button className="btn btn-md rounded-circle bg-light border mt-4">
                          <i className="bi bi-pencil text-success" />
                        </button>
                      </Link>
                      &nbsp;
                      <button className="btn btn-md rounded-circle bg-light border mt-4"
                        onClick={() => deleteHackathon(Hackathon.id)}>
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