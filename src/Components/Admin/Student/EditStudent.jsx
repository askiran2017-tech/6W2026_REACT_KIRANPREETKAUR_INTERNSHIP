import { Link, useParams,useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import StudentServices from "../../../Services/StudentServices"
export default function EditStudent() {
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [profileImage, setprofileImage] = useState("");
    const [userType, setuserType] = useState("");
    const [status, setStatus] = useState("");
    const [CreatedAt, setCreatedAt] = useState("");
    const [updatedAt, setupdatedAt] = useState("");
    const params = useParams()
    const navigate = useNavigate();


    async function updateStudent(e) {
        e.preventDefault()
        try {
            let payload = {
                name: StudentName,
                email: Email,
                phone: Phone,
                address: Address,
                profileImage: profileImage,
                userType: "student",
                status: "active",
                createdAt:CreatedAt,
                updatedAt: new Date()
            }
            console.log("Payload:", payload);
            await StudentServices.update(params.id, payload)
            toast.success("student updated successfully");
            navigate("/Admin/ManageStudent");
        } catch (err) {
            console.log("error:", err)
            toast.error("error update student")
        }
    }
    async function getStudentDetails() {
        let res = await StudentServices.single(params.id)
        if (res) {
            console.log("Res:", res);
            setStudentName(res.name)
            setEmail(res.email)
            setPhone(res.phone)
            setAddress(res.address)
            setprofileImage(res.profileImage)
            setuserType(res.userType)
            setStatus(res.status)
            setCreatedAt(res.createdAt)
            setupdatedAt(res.updatedAt)
        } else {
            toast.error("no such data")
        }
    }
    useEffect(() => {
        getStudentDetails();
    }, [params.id]);


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Edit Student</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Edit Student
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={updateStudent} style={{ width: 800 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className=" form-control border-0 py-3 mb-4"
                                placeholder="Enter Student Name" value={StudentName}
                                onChange={(e) => setStudentName(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="email"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter email" value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                            /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="number"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter phone" value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter address" value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                            /></div>


                        <div className="col-md-6">
                            <input
                                type="file"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter profile image"
                                onChange={(e) => setprofileImage(e.target.files[0])}
                            /></div>
                    </div>


                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Edit Student
                    </button>
                </form>
            </div>

        </>
    )
}