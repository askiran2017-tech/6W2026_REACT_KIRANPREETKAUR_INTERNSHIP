import { Link,useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";

import StudentServices from "../../../Services/StudentServices"
export default function AddStudent() {
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [profileImage, setprofileImage] = useState("");
      const navigate = useNavigate();


    async function AddStudent(e) {
        e.preventDefault()
        try {
            let imageUrl=""
            if(image){
                imageUrl=cloudinaryService.upload(image)
            }
            let payload = {
                name: StudentName,
                email: Email,
                phone: Phone,
                address: Address,
                profileImage: profileImage,
                userType:  "student",
                status:  "active",
                
            }
            console.log("Payload:", payload);
            await StudentServices.add(payload)
            toast.success("student added");
            navigate("/Admin/ManageStudent");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding student")
        }
    }


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Add Student</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Add Student
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={AddStudent} style={{ width: 800 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className=" form-control border-0 py-3 mb-4"
                                placeholder="Enter Student Name"
                                onChange={(e) => setStudentName(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="email"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter email"
                                onChange={(e) => setEmail(e.target.value)}
                            /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="number"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter phone"
                                onChange={(e) => setPhone(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter Address"
                                onChange={(e) => setAddress(e.target.value)}
                            /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="file"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter Profile image"
                                onChange={(e) => setprofileImage(e.target.files[0])}
                            /></div>
                        
                           
                    </div>
                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Add Student
                    </button>
                </form>
            </div>

        </>
    )
}