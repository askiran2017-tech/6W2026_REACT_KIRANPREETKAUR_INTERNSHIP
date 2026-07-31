import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import HackathonServices from "../../../Services/HackathonServices"
import CategoryServices from "../../../Services/CategoryServices"

export default function AddHackathon() {
    const [CategoryId, setCategoryId] = useState("");
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Venue, setVenue] = useState("");
    const [EventDate, setEventDate] = useState("");
    const [LastDate, setLastDate] = useState("");
    const [Prize, setPrize] = useState("");
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


    async function AddHackathon(e) {
        e.preventDefault()
        try {
            let payload = {
                categoryId: CategoryId,
                title: Title,
                description: Description,
                venue:Venue,
                eventDate:EventDate,
                lastDate: LastDate,
                prize:Prize,
                status: "active",
                createdAt: new Date(),
                updatedAt: new Date()

            }
            console.log("Payload:", payload);
            await HackathonServices.add(payload)
            toast.success("Hackathon added");
            navigate("/Admin/ManageHackathon");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding Hackathon")
        }
    }


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Add Hackathon</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Add Hackathon
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={AddHackathon} style={{ width: 800 }}>
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
                                placeholder="Enter title" value={Title}
                                onChange={(e) => setTitle(e.target.value)}
                            /></div>
                        </div>
                    
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter description" value={Description}
                                onChange={(e) => setDescription(e.target.value)}
                            /></div>
                            <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter Venue" value={Venue}
                                onChange={(e) => setVenue(e.target.value)}
                            /></div></div>

                    <div className="row">
                        
                        <div className="col-md-6">
                            <input
                                type="date"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter EventDate" value={EventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                            /></div>
                             <div className="col-md-6">
                            <input
                                type="date"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter lastDate" value={LastDate}
                                onChange={(e) => setLastDate(e.target.value)}
                            /></div></div>
                        <div className="row">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="w-100 form-control border-0 py-3 mb-4"
                                    placeholder="Enter prize" value={Prize}
                                    onChange={(e) => setPrize(e.target.value)}
                                /></div>
                                 </div>

                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Add Hackathon
                    </button>
                </form>
            </div>

        </>
    )
}