import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import ResultServices from "../../../Services/ResultServices"
import ApplicationServices from "../../../Services/ApplicationServices"
import StudentServices from "../../../Services/StudentServices"
import InternshipServices from "../../../Services/InternshipServices"
import HackathonServices from "../../../Services/HackathonServices"

export default function EditResult() {
    const [ApplicationId, setApplicationId] = useState("");
    const [Result, setResult] = useState("");
    const [Remarks, setRemarks] = useState("");
    const [PublishedAt, setPublishedAt] = useState("");


    const params = useParams()
    const navigate = useNavigate();

    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [internships, setInternships] = useState([]);
    const [hackathons, setHackathons] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const [appRes, userRes, intRes, hackRes] = await Promise.all([
                    ApplicationServices.all(),
                    StudentServices.all(),
                    InternshipServices.all(),
                    HackathonServices.all()
                ]);
                setApplications(appRes);
                setUsers(userRes);
                setInternships(intRes);
                setHackathons(hackRes);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }
        fetchData();
    }, []);


    async function updateResult(e) {
        e.preventDefault()
        if (!ApplicationId) {
            toast.error("Please select an application");
            return;
        }
        if (!Result.trim()) {
            toast.error("Please enter result status");
            return;
        }
        if (!PublishedAt) {
            toast.error("Please select published date");
            return;
        }

        try {
            let payload = {
                applicationId: ApplicationId,
                result: Result.trim(),
                remarks: Remarks.trim(),
                publishedAt: PublishedAt,
            }
            console.log("Payload:", payload);
            await ResultServices.update(params.id, payload)
            toast.success("Result updated successfully");
            navigate("/Admin/ManageResult");
        } catch (err) {
            console.log("error:", err)
            toast.error("error update Result")
        }
    }
    async function getResultDetails() {
        let res = await ResultServices.single(params.id)
        if (res) {
            console.log("Res:", res);
            setApplicationId(res.applicationId)
            setResult(res.result)
            setRemarks(res.remarks)
            setPublishedAt(res.publishedAt)
         } else {
            toast.error("no such data")
        }
    }
    useEffect(() => {
        getResultDetails();
    }, [params.id]);


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Edit Result</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Edit Result
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={updateResult} style={{ width: 800 }}>

                    <select
                        className="form-select border-0 py-3 mb-4"
                        value={ApplicationId}
                        onChange={(e) => setApplicationId(e.target.value)}
                    >
                        <option value="">Select Application</option>
                        {applications.map(app => {
                            const userName = users.find(u => u.id === app.userId)?.name || "Unknown User";
                            let programName = "";
                            if (app.internshipId) {
                                programName = "Internship: " + (internships.find(i => i.id === app.internshipId)?.title || "Unknown");
                            } else if (app.hackathonId) {
                                programName = "Hackathon: " + (hackathons.find(h => h.id === app.hackathonId)?.title || "Unknown");
                            }
                            return (
                                <option key={app.id} value={app.id}>
                                    {userName} - {programName}
                                </option>
                            );
                        })}
                    </select>
                    <select
                        className="w-100 form-control border-0 py-3 mb-4" value={Result}
                        onChange={(e) => setResult(e.target.value)}
                    >
                        <option value="">Select Result</option>
                        <option value="Selected">Selected</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Winner">Winner</option>
                    </select>

                    <textarea
                        className="form-control border-0 py-3 mb-4"
                        rows="4"
                        placeholder="Enter Remarks"
                        value={Remarks}
                        onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>

                    <input
                        type="date"
                        className="w-100 form-control border-0 py-3 mb-4"
                        placeholder="Enter publishedAt" value={PublishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                    />



                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Edit Result
                    </button>
                </form>
            </div>

        </>
    )
}