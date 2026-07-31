import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import InternshipServices from "../../../Services/InternshipServices"
import CategoryServices from "../../../Services/CategoryServices"

export default function EditInternship() {
    const [CategoryId, setCategoryId] = useState("");
    const [CompanyName, setCompanyName] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Duration, setDuration] = useState("");
    const [Stipend, setStipend] = useState("");
    const [Location, setLocation] = useState("");
    const [LastDate, setLastDate] = useState("");
    const [Status, setStatus] = useState("");
    const [CreatedAt, setCreatedAt] = useState("");
    const [UpdatedAt, setUpdatedAt] = useState("");

    const params = useParams()
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function fetchCategories() {
            try {
                const res = await CategoryServices.all();
                setCategories(res);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        }
        fetchCategories();
    }, []);


    async function updateInternship(e) {
        e.preventDefault()
        try {
            let payload = {
                categoryId: CategoryId,
                companyName: CompanyName,
                title: Title,
                description: Description,
                duration: Duration,
                stipend: Stipend,
                location: Location,
                lastDate: LastDate,
                status: "active",
                createdAt: CreatedAt,
                updatedAt: new Date()

            }
            console.log("Payload:", payload);
            await InternshipServices.update(params.id, payload)
            toast.success("Internship updated successfully");
            navigate("/Admin/ManageInternship");
        } catch (err) {
            console.log("error:", err)
            toast.error("error update Internship")
        }
    }
    async function getInternshipDetails() {
        let res = await InternshipServices.single(params.id)
        if (res) {
            console.log("Res:", res);
            setCategoryId(res.categoryId)
            setCompanyName(res.companyName)
            setTitle(res.title)
            setDescription(res.description)
            setDuration(res.duration)
            setStipend(res.stipend)
            setLocation(res.location)
            setLastDate(res.lastDate)
            setStatus(res.status)
            setCreatedAt(res.createdAt);
            setUpdatedAt(res.updatedAt);

        } else {
            toast.error("no such data")
        }
    }
    useEffect(() => {
        getInternshipDetails();
    }, [params.id]);


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Edit Internship</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Edit Internship
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={updateInternship} style={{ width: 800 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <select 
                                className="form-select border-0 py-3 mb-4"
                                value={CategoryId}
                                onChange={(e) => setCategoryId(e.target.value)}
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select></div>
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
                        Edit Internship
                    </button>
                </form>
            </div>

        </>
    )
}