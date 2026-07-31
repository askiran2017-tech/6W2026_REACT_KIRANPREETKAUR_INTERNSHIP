import { useEffect, useState } from "react";
import StudentServices from "../../../Services/StudentServices";
import InternshipServices from "../../../Services/InternshipServices";
import HackathonServices from "../../../Services/HackathonServices";
import ApplicationServices from "../../../Services/ApplicationServices";

export default function Dashboard() {
    const [counts, setCounts] = useState({
        students: 0,
        internships: 0,
        hackathons: 0,
        applications: 0
    });

    useEffect(() => {
        async function fetchCounts() {
            try {
                const students = await StudentServices.all();
                const internships = await InternshipServices.all();
                const hackathons = await HackathonServices.all();
                const applications = await ApplicationServices.all();
                
                setCounts({
                    students: students.length,
                    internships: internships.length,
                    hackathons: hackathons.length,
                    applications: applications.length
                });
            } catch (error) {
                console.error("Error fetching dashboard counts:", error);
            }
        }
        fetchCounts();
    }, []);

    return (
        <>
            <div className="container-xxl py-5 bg-dark page-header mb-5">
                <div className="container my-5 ">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Admin Dashboard</h1>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row g-4">
                    <div className="col-lg-3 col-sm-6">
                        <div className="card shadow-sm border-0 bg-light rounded p-4 text-center">
                            <i className="fa fa-users fa-3x text-primary mb-3"></i>
                            <h2 className="mb-2">{counts.students}</h2>
                            <p className="text-muted mb-0">Total Students</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card shadow-sm border-0 bg-light rounded p-4 text-center">
                            <i className="fa fa-briefcase fa-3x text-success mb-3"></i>
                            <h2 className="mb-2">{counts.internships}</h2>
                            <p className="text-muted mb-0">Total Internships</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card shadow-sm border-0 bg-light rounded p-4 text-center">
                            <i className="fa fa-laptop-code fa-3x text-warning mb-3"></i>
                            <h2 className="mb-2">{counts.hackathons}</h2>
                            <p className="text-muted mb-0">Total Hackathons</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <div className="card shadow-sm border-0 bg-light rounded p-4 text-center">
                            <i className="fa fa-file-alt fa-3x text-danger mb-3"></i>
                            <h2 className="mb-2">{counts.applications}</h2>
                            <p className="text-muted mb-0">Total Applications</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}