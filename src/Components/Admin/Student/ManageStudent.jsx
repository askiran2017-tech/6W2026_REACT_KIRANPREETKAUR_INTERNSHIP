import { Link } from "react-router-dom"
import StudentServices from "../../../Services/StudentServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"

export default function ManageStudent() {
  const [Student, setStudent] = useState([])

  function formatDate(dateVal) {
    if (!dateVal) return "-";
    if (dateVal.toDate) {
      return dateVal.toDate().toLocaleDateString();
    }
    return new Date(dateVal).toLocaleDateString();
  }

  async function getStudent() {
    let res = await StudentServices.all()
    console.log("response:", res)
    setStudent(res)
  }

  useEffect(() => {
    getStudent()
  }, [])

  async function deleteStudent(id){
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
      await StudentServices.deletestu(id)
      await Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
      toast.success("student deleted successfully")
      getStudent()
    }
  }

  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Student</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Student
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success">All Students List</h1>
          <Link to='/Admin/AddStudent'>
            <button
              className="btn border-secondary py-3 bg-success text-white"
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Student List
            </button>
          </Link>
        </div>
      </div>

      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Sr.No.</th>
                  <th scope="col">Student Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">ProfileImage</th>
                  <th scope="col">UserType</th>
                  <th scope="col">createdAt</th>
                  <th scope="col">updatedAt</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {Student.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      No students found.
                    </td>
                  </tr>
                ) : (
                  Student.map((student, index) => (
                    <tr key={student.id}>
                      <td>
                        <p className="mb-0 mt-4">{index + 1}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{student.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{student.email}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{student.phone}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{student.address}</p>
                      </td>
                      <td>
                        {student.profileImage ? (
                          <img
                            src={student.profileImage}
                            alt="Profile"
                            className="rounded-circle mt-3"
                            style={{ width: "45px", height: "45px", objectFit: "cover" }}
                          />
                        ) : (
                          <p className="mb-0 mt-4 text-muted">No Image</p>
                        )}
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{student.userType == 2 ? "Student" : student.userType}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{formatDate(student.createdAt)}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{formatDate(student.updatedAt)}</p>
                      </td>
                      <td>
                        <Link to={`/Admin/Student/EditStudent/${student.id}`}>
                          <button className="btn btn-md rounded-circle bg-light border mt-4">
                            <i className="bi bi-pencil text-success" />
                          </button>
                        </Link>
                        &nbsp;
                        <button
                          className="btn btn-md rounded-circle bg-light border mt-4"
                          onClick={() => deleteStudent(student.id)}
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
        </div>
      </div>
    </>
  )
}