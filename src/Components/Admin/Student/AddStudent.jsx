import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";
import StudentServices from "../../../Services/StudentServices"
import CloudinaryServices from "../../../Services/CloudinaryServices"

export default function AddStudent() {
    const [StudentName, setStudentName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address, setAddress] = useState("");
    const [profileImage, setprofileImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function handleAddStudent(e) {
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
            let imageUrl = ""
            if (profileImage) {
                imageUrl = await CloudinaryServices.upload(profileImage);
            }
            let payload = {
                name: trimmedName,
                email: trimmedEmail,
                phone: trimmedPhone,
                address: trimmedAddress,
                profileImage: imageUrl,
                userType: 2,
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()
            }
            console.log("Payload:", payload);
            await StudentServices.add(payload)
            toast.success("student added successfully");
            navigate("/Admin/ManageStudent");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding student")
        } finally {
            setLoading(false);
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

            <div className="container d-flex justify-content-center mt-5 mb-5">
                <form onSubmit={handleAddStudent} style={{ width: 800 }}>
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
                                placeholder="Enter Address"
                                value={Address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
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
                        {loading ? "Adding Student..." : "Add Student"}
                    </button>
                </form>
            </div>
        </>
    )
}