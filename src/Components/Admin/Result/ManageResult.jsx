import { Link } from "react-router-dom"
import ResultServices from "../../../Services/ResultServices"
import ApplicationServices from "../../../Services/ApplicationServices"
import StudentServices from "../../../Services/StudentServices"
import InternshipServices from "../../../Services/InternshipServices"
import HackathonServices from "../../../Services/HackathonServices"
import { useEffect, useState } from "react"
import Swal from 'sweetalert2'
import { toast } from "react-toastify"
import { PacmanLoader } from "react-spinners"
const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};


export default function ManageResult() {
    let [loading, setLoading] = useState(false)
    const [Result, setResult] = useState([])
    const [applications, setApplications] = useState([]);
    const [users, setUsers] = useState([]);
    const [internships, setInternships] = useState([]);
    const [hackathons, setHackathons] = useState([]);
    
    async function getResult() {
        try {
            setLoading(true);

            const [res, appRes, userRes, intRes, hackRes] = await Promise.all([
                ResultServices.all(),
                ApplicationServices.all(),
                StudentServices.all(),
                InternshipServices.all(),
                HackathonServices.all()
            ]);
            console.log("response:", res);

            setResult(res);
            setApplications(appRes);
            setUsers(userRes);
            setInternships(intRes);
            setHackathons(hackRes);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load result");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        getResult()
    }, [])
    async function deleteResult(id) {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        if (result.isConfirmed) {
            await ResultServices.deleteResult(id)
            await Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
            toast.success("Result deleted successfully")
            getResult()
        }
    }

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
                    <Link to='/Admin/AddResult'>
                        <button
                            className="btn border-secondary py-3 bg-success text-white  "
                            type="submit"
                        >
                            <i className="bi bi-plus"></i>
                            Add Result List
                        </button>
                    </Link>
                </div>
            </div>
            <div className="container-fluid py-5">
                <div className="container py-5">
                    {loading ? (<PacmanLoader
                        color={"#0de114"}
                        loading={loading}
                        cssOverride={override}
                        size={100}
                        aria-label="Loading Spinner"
                        data-testid="loader" />) : (
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr.No.</th>
                                        <th scope="col">Application</th>
                                        <th scope="col">Result</th>
                                        <th scope="col">Remarks</th>
                                        <th scope="col">PublishedAt</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Result.map((Result, index) => (
                                        <tr key={Result.id}>

                                            <td>
                                                <p className="mb-0 mt-4">{index + 1}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">
                                                    {(() => {
                                                        const app = applications.find(a => a.id === Result.applicationId);
                                                        if (!app) return Result.applicationId;
                                                        const userName = users.find(u => u.id === app.userId)?.name || "Unknown User";
                                                        let programName = "";
                                                        if (app.internshipId) {
                                                            programName = "Internship: " + (internships.find(i => i.id === app.internshipId)?.title || "Unknown");
                                                        } else if (app.hackathonId) {
                                                            programName = "Hackathon: " + (hackathons.find(h => h.id === app.hackathonId)?.title || "Unknown");
                                                        }
                                                        return `${userName} - ${programName}`;
                                                    })()}
                                                </p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{Result.result}</p>
                                            </td>
                                            <td>
                                                <p className="mb-0 mt-4">{Result.remarks}</p>
                                            </td>

                                            <td>
                                                <p className="mb-0 mt-4">
                                                    {new Date(Result.publishedAt).toLocaleDateString()}
                                                </p>
                                            </td>
                                            <td>
                                                <Link to={`/Admin/Result/EditResult/${Result.id}`}>
                                                    <button className="btn btn-md rounded-circle bg-light border mt-4">
                                                        <i className="bi bi-pencil text-success" />
                                                    </button>
                                                </Link>
                                                &nbsp;
                                                <button className="btn btn-md rounded-circle bg-light border mt-4"
                                                    onClick={() => deleteResult(Result.id)}>
                                                    <i className="bi bi-trash text-danger" />
                                                </button>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>)}
                </div>


            </div>

        </>
    )
}