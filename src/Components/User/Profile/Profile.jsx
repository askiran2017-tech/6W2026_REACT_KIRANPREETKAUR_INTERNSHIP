import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AuthServices from "../../../Services/AuthServices";
import StudentServices from "../../../Services/StudentServices";
import CloudinaryServices from "../../../Services/CloudinaryServices";

export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const uid = AuthServices.getId();
                const email = AuthServices.getEmail();
                if (!uid && !email) return;

                let currentStudent = null;
                if (uid) {
                    const studentDoc = await StudentServices.single(uid);
                    if (studentDoc) {
                        currentStudent = studentDoc;
                    }
                }

                if (!currentStudent && email) {
                    const allStudents = await StudentServices.all();
                    currentStudent = allStudents.find(s => s.email === email);
                }
                
                if (currentStudent) {
                    setStudentData(currentStudent);
                    setName(currentStudent.name || "");
                    setPhone(currentStudent.phone || currentStudent.contact || "");
                    setAddress(currentStudent.address || "");
                    setPreviewImage(currentStudent.profileImage || "");
                }
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        }
        fetchProfile();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        const trimmedName = name.trim();
        const trimmedPhone = phone.toString().trim();
        const trimmedAddress = address.trim();

        if (!trimmedName) {
            toast.error("Please enter your name");
            return;
        }
        if (trimmedName.length < 3) {
            toast.error("Name must be at least 3 characters");
            return;
        }

        if (!trimmedPhone) {
            toast.error("Please enter your phone number");
            return;
        }
        if (!/^\d{10}$/.test(trimmedPhone)) {
            toast.error("Phone number must be a valid 10-digit number");
            return;
        }

        if (!trimmedAddress) {
            toast.error("Please enter your address");
            return;
        }

        setLoading(true);
        try {
            let imageUrl = previewImage;
            if (profileImage) {
                imageUrl = await CloudinaryServices.upload(profileImage);
            }

            const payload = {
                name: trimmedName,
                phone: trimmedPhone,
                contact: trimmedPhone,
                address: trimmedAddress,
                profileImage: imageUrl,
                updatedAt: new Date()
            };

            if (studentData && studentData.id) {
                await StudentServices.update(studentData.id, payload);
                toast.success("Profile updated successfully!");
                setStudentData({ ...studentData, ...payload });
            } else {
                toast.error("Student profile not found.");
            }
        } catch (error) {
            console.error("Error updating profile", error);
            toast.error("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">My Profile</h1>
            </div>
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card shadow border-0">
                            <div className="card-body p-5">
                                <form onSubmit={updateProfile}>
                                    <div className="text-center mb-4">
                                        <img 
                                            src={previewImage || "https://via.placeholder.com/150"} 
                                            alt="Profile" 
                                            className="rounded-circle img-fluid border border-3 border-primary"
                                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                                        />
                                        <div className="mt-3">
                                            <input type="file" className="form-control" onChange={handleImageChange} accept="image/*" />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Name</label>
                                        <input type="text" className="form-control py-3" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Email (Read Only)</label>
                                        <input type="email" className="form-control py-3" value={studentData?.email || ""} readOnly disabled />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label fw-bold">Phone Number</label>
                                        <input type="tel" className="form-control py-3" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Address</label>
                                        <textarea className="form-control py-3" rows="3" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 py-3" disabled={loading}>
                                        {loading ? "Updating..." : "Update Profile"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
