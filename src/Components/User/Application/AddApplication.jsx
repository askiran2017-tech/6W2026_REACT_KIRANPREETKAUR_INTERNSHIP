import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { toast } from "react-toastify";

import ApplicationServices from "../../../Services/ApplicationServices"
export default function AddApplication() {
    const [UserId, setUserId] = useState("");
    const [InternshipId, setInternshipId] = useState("");
    const [HackathonId, setHackathonId] = useState("");
    const [SubmissionUrl, setSubmissionUrl] = useState("");
    const [InterviewDate, setInterviewDate] = useState("");
    const [InterviewTime, setInterviewTime] = useState("");
    const [ApplicationStatus, setApplicationStatus] = useState("");
    const navigate = useNavigate();


    async function AddApplication(e) {
        e.preventDefault()
        if (!InternshipId && !HackathonId) {
            toast.error("Please select an internship or hackathon");
            return;
        }
        if (!SubmissionUrl.trim()) {
            toast.error("Submission URL is required");
            return;
        }

        try {
            let payload = {
                userId: UserId,
                internshipId: InternshipId,
                hackathonId: HackathonId,
                submissionUrl: SubmissionUrl,
                interviewDate: InterviewDate,
                interviewTime: InterviewTime,
                applicationStatus: ApplicationStatus,
                createdAt: new Date(),
                updatedAt: new Date()

            }
            console.log("Payload:", payload);
            await ApplicationServices.add(payload)
            toast.success("Application added");
            navigate("/ManageApplication");
        } catch (err) {
            console.log("error:", err)
            toast.error("error adding Application")
        }
    }


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Add Application</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Add Application
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={AddApplication} style={{ width: 800 }}>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className=" form-control border-0 py-3 mb-4"
                                placeholder="Enter userId" value={UserId}
                                onChange={(e) => setUserId(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter internshipId" value={InternshipId}
                                onChange={(e) => setInternshipId(e.target.value)}
                            /></div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter hackathonId" value={HackathonId}
                                onChange={(e) => setHackathonId(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="text"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter submisssionUrl" value={SubmissionUrl}
                                onChange={(e) => setSubmissionUrl(e.target.value)}
                            /></div></div>

                    <div className="row">
                        <div className="col-md-6">
                            <input
                                type="date"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter interviewDate" value={InterviewDate}
                                onChange={(e) => setInterviewDate(e.target.value)}
                            /></div>
                        <div className="col-md-6">
                            <input
                                type="time"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter interviewTime" value={InterviewTime}
                                onChange={(e) => setInterviewTime(e.target.value)}
                            /></div></div>


                    <div className="row">
                        <select
                            className="form-control py-3 mb-4"
                            value={ApplicationStatus}
                            onChange={(e) => setApplicationStatus(e.target.value)}
                        >
                            <option value=""selected disabled>Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Add Application
                    </button>
                </form>
            </div>

        </>
    )
}