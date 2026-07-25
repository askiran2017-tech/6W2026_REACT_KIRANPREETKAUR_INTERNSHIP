import { Link } from "react-router-dom"
import CategoryServices from "../../../Services/CategoryServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
export default function ViewCategory() {
  const [Category, setCategory] = useState([])
  async function getCategory() {
    let res = await CategoryServices.all()
    console.log("response:", res)
    setCategory(res)
  }
  useEffect(() => {
    getCategory()
  }, [])
  


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
          
        </div>
      </div>

     <div className="container py-5">
  <div className="row justify-content-center g-4">
    {Category.map((item) => (
      <div className="col-lg-4 col-md-6" key={item.id}>
        <div className="card shadow h-100 border-0 rounded-3"
        style={{  minHeight :"300px" }}>

          <div className="card-body">
            <h3 className="text-success fw-bold text-center mb-4 mt-2">
              {item.name}
            </h3>

            <hr/>

            <p className="text-muted mb-5 mt-4">
              {item.description}
            </p>

            <div className="text-center mt-4">
              <button className="btn btn-success px-4">
                View Category
              </button>
            </div>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>

    </>
  )
}