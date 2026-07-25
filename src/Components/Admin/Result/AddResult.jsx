import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";

import ResultServices from "../../../Services/ResultServices"
export default function AddResult() {
    const [ApplicationId, setApplicationId] = useState("");
    const [Remarks, setRemarks] = useState("");
    const [Result, setResult] = useState("");
    const [PublishedAt, setPublishedAt] = useState("");
    const navigate = useNavigate();


    async function AddResult(e) {
        e.preventDefault()
        try {
            let payload = {
                applicationId: ApplicationId,
                result: Result,
                remarks: Remarks,
                publishedAt: PublishedAt

            }
            console.log("Payload:", payload);
            await ResultServices.add(payload)
            toast.success("Result added");
            navigate("/Admin/ManageResult");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding Result")
        }
    }


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Add Result</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Add Result
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={AddResult} style={{ width: 800 }}>

                    <input
                        type="text"
                        className=" form-control border-0 py-3 mb-4"
                        placeholder="Enter ApplicationId"
                        onChange={(e) => setApplicationId(e.target.value)}
                    />

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
                        onChange={(e) => setRemarks(e.target.value)}
                    ></textarea>
                    <input
                        type="date"
                        className="form-control border-0 py-3 mb-4"
                        value={PublishedAt}
                        onChange={(e) => setPublishedAt(e.target.value)}
                    />



                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Add Result
                    </button>
                </form>
            </div>

        </>
    )
}