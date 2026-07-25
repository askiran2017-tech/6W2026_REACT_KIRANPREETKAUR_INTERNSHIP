import { Link } from "react-router-dom"
import ResultServices from "../../../Services/ResultServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"

export default function ViewResult() {

  const [Result, setResult] = useState([])
  async function getResult() {
    let res = await ResultServices.all()
    console.log("response:", res)
    setResult(res)
  }
  useEffect(() => {
    getResult()
  }, [])


  return (
    <>
      <div className="container-xxl py-5 bg-dark page-header mb-5">
        <div className="container my-5 ">

          <h1 className="display-3 text-white mb-3 animated slideInDown">Result</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb text-uppercase">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Pages</Link>
              </li>
              <li className="breadcrumb-item text-white active" aria-current="page">
                Result
              </li>
            </ol>
          </nav>

        </div>
      </div>

      <div className="container ">
        <div className="container d-flex justify-content-between mt-5">
          <h1 className="text-success"> Result List</h1>

        </div>
      </div>
      <div className="container py-5">
        <div className="row justify-content-center g-5">
          {Result.map((item) => (
            <div className="col-lg-4 col-md-6 mb-4" key={item.id}>
              <div className="card shadow h-100 border-0 rounded-3">

                <div className="card-body">
                  <h4 className="card-title text-primary fw-bold ">
                    {item.applicationId}
                  </h4>
                  <hr />
                  <p>
                    <strong>Result:</strong> {item.result}
                  </p>
                  <p>
                    <strong>Remarks:</strong>  {item.remarks}
                  </p>
                  <p>
                    <strong>PublishedAt:</strong>  {item.publishedAt}
                  </p>
                 

                  <button className="btn btn-success w-100">
                    Result
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>


    </>
  )
}