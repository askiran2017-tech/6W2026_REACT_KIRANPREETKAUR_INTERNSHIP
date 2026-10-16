import { Link, useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from "react-toastify";

import ApplicationServices from "../../../Services/ApplicationServices"
export default function EditApplication() {
    const [UserId, setUserId] = useState("");
    const [InternshipId, setInternshipId] = useState("");
    const [HackathonId, setHackathonId] = useState("");
    const [SubmissionUrl, setSubmissionUrl] = useState("");
    const [InterviewDate, setInterviewDate] = useState("");
    const [InterviewTime, setInterviewTime] = useState("");
    const [ApplicationStatus, setApplicationStatus] = useState("");
    const [CreatedAt, setCreatedAt] = useState("");
    const [updatedAt, setupdatedAt] = useState("");
    const params = useParams()
    const navigate = useNavigate();


    async function updateApplication(e) {
        e.preventDefault()
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
                createdAt: CreatedAt,
                updatedAt: new Date()

            }
            console.log("Payload:", payload);
            await ApplicationServices.update(params.id, payload)
            toast.success("Application updated successfully");
            navigate("/ManageApplication");
        } catch (err) {
            console.log("error:", err)
            toast.error("error update Application")
        }
    }
    async function getApplicationDetails() {
        let res = await ApplicationServices.single(params.id)
        if (res) {
            console.log("Res:", res);
            setUserId(res.userId)
            setInternshipId(res.internshipId)
            setHackathonId(res.hackathonId)
            setSubmissionUrl(res.submissionUrl)
            setInterviewDate(res.interviewDate)
            setInterviewTime(res.interviewTime)
            setApplicationStatus(res.applicationStatus)
            setCreatedAt(res.createdAt)
            setupdatedAt(res.updatedAt)

        } else {
            toast.error("no such data")
        }
    }
    useEffect(() => {
        getApplicationDetails();
    }, [params.id]);


    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">

                    <h1 className="display-3 text-white mb-3 animated slideInDown">Edit Application</h1>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb text-uppercase">
                            <li className="breadcrumb-item">
                                <Link to="#">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link to="#">Pages</Link>
                            </li>
                            <li className="breadcrumb-item text-white active" aria-current="page">
                                Edit Application
                            </li>
                        </ol>
                    </nav>

                </div>
            </div>

            <div className="container d-flex justify-content-center  mt-5">
                <form onSubmit={updateApplication} style={{ width: 800 }}>
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
                                placeholder="Enter submissionUrl" value={SubmissionUrl}
                                onChange={(e) => setSubmissionUrl(e.target.value)}
                            /></div></div>

                    <div className="row">

                        <div className="col-md-6">
                            <input
                                type="date"
                                className="w-100 form-control border-0 py-3 mb-4"
                                placeholder="Enter InterviewDate" value={InterviewDate}
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
                            className="w-100 form-control border-0 py-3 mb-4"
                            value={ApplicationStatus}
                            onChange={(e) => setApplicationStatus(e.target.value)}
                        >
                            <option value="">Select Status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>

                    <button
                        className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                        type="submit"
                    >
                        Edit Application
                    </button>
                </form>
            </div>

        </>
    )
}