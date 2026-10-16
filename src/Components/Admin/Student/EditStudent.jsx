import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";
import StudentServices from "../../../Services/StudentServices"
import CloudinaryServices from "../../../Services/CloudinaryServices"

export default function EditStudent() {
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [profileImage, setprofileImage] = useState("");
    const [userType, setuserType] = useState(2);
    const [status, setStatus] = useState("active");
    const [CreatedAt, setCreatedAt] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams()
    const navigate = useNavigate();

    async function updateStudent(e) {
        e.preventDefault()
        const trimmedName = StudentName.trim();
        const trimmedEmail = Email.trim();
        const trimmedPhone = Phone.toString().trim();
        const trimmedAddress = Address.trim();

        if (!trimmedName) {
            toast.error("Please enter student name");
            return;
        }
        if (trimmedName.length < 3) {
            toast.error("Student name must be at least 3 characters");
            return;
        }

        if (!trimmedEmail) {
            toast.error("Please enter student email");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedEmail)) {
            toast.error("Please enter a valid email address");
            return;
        }

        if (!trimmedPhone) {
            toast.error("Please enter phone number");
            return;
        }
        if (!/^\d{10}$/.test(trimmedPhone)) {
            toast.error("Phone number must be a valid 10-digit number");
            return;
        }

        if (!trimmedAddress) {
            toast.error("Please enter student address");
            return;
        }

        try {
            setLoading(true);
            let imageUrl = profileImage;
            if (profileImage && typeof profileImage === "object") {
                imageUrl = await CloudinaryServices.upload(profileImage);
            }
            let payload = {
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
                address: trimmedAddress,
                profileImage: imageUrl,
                userType: 2,
                status: status || "active",
                createdAt: CreatedAt || new Date(),
                updatedAt: new Date()
            }
            console.log("Payload:", payload);
            await StudentServices.update(params.id, payload)
            toast.success("student updated successfully");
            navigate("/Admin/ManageStudent");
        } catch (err) {
            console.log("error:", err)
            toast.error("error update student")
        } finally {
            setLoading(false);
        }
    }

    async function getStudentDetails() {
        let res = await StudentServices.single(params.id)
        if (res) {
            console.log("Res:", res);
            setStudentName(res.name || "")
            setEmail(res.email || "")
            setPhone(res.phone || res.contact || "")
            setAddress(res.address || "")
            setprofileImage(res.profileImage || "")
            setuserType(res.userType || 2)
            setStatus(res.status || "active")
            setCreatedAt(res.createdAt || "")
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

            <div className="container d-flex justify-content-center mt-5 mb-5">
                <form onSubmit={updateStudent} style={{ width: 800 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="form-control border py-3 mb-4"
                                placeholder="Enter Student Name"
                                value={StudentName}
                                onChange={(e) => setStudentName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="email"
                                className="w-100 form-control border py-3 mb-4"
                                placeholder="Enter email"
                                value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="number"
                                className="w-100 form-control border py-3 mb-4"
                                placeholder="Enter phone"
                                value={Phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border py-3 mb-4"
                                placeholder="Enter address"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="col-md-12">
                            <input
                                type="file"
                                className="w-100 form-control border py-3 mb-4"
                                accept="image/*"
                                onChange={(e) => setprofileImage(e.target.files[0])}
                            />
                        </div>
                    </div>

                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Updating Student..." : "Edit Student"}
                    </button>
                </form>
            </div>
        </>
    )
}