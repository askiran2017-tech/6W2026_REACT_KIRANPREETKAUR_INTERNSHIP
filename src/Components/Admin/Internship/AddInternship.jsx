import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";

import InternshipServices from "../../../Services/InternshipServices"
export default function AddInternship() {
    const [CategoryId, setCategoryId] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
     const [Duration, setDuration] = useState("");
    const [Stipend, setStipend] = useState("");
    const [Location, setLocation] = useState("");
    const [LastDate, setLastDate] = useState("");
    const navigate = useNavigate();


    async function AddInternship(e) {
        e.preventDefault()
        try {
            let payload = {
                categoryId: CategoryId,
                companyName: CompanyName,
                title: Title,
                description: Description,
                duration:Duration,
                stipend: Stipend,
                location: Location,
                lastDate: LastDate,
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()

            }
            console.log("Payload:", payload);
            await InternshipServices.add(payload)
            toast.success("Internship added");
            navigate("/Admin/ManageInternship");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding Internship")
        }
    }


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Add Internship</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Add Internship
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={AddInternship} style={{ width: 800 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className=" form-control border-0 py-3 mb-4"
                                placeholder="Enter categoryId" value={CategoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter company name" value={CompanyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter title" value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter description" value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                            /></div></div>

                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter duration" value={Duration}
                                onChange={(e) => setDuration(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="number"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter stipend" value={Stipend}
                                onChange={(e) => setStipend(e.target.value)}
                            /></div></div>
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="w-100 form-control border-0 py-3 mb-4"
                                    placeholder="Enter location" value={Location}
                                    onChange={(e) => setLocation(e.target.value)}
                                /></div>
                       
                    
                        <div className="col-md-6">
                            <input
                                type="date"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter lastDate" value={LastDate}
                                onChange={(e) => setLastDate(e.target.value)}
                            /></div>
                    </div>

                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Add Internship
                    </button>
                </form>
            </div>

        </>
    )
}