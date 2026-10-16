import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from "../../../Services/UserServices";
import CloudinaryServices from "../../../Services/CloudinaryServices";
import AuthServices from "../../../Services/AuthServices";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    if (AuthServices.isLoggedIn()) {
      if (AuthServices.isAdmin()) {
        nav('/Admin/Dashboard');
      } else {
        nav('/ViewInternship');
      }
    }
  }, [nav]);

  async function handleRegister(e) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedContact = contact.trim();

    if (!trimmedName) {
      toast.error("Please enter your name");
      return;
    }
    if (trimmedName.length < 3) {
      toast.error("Name must be at least 3 characters");
      return;
    }

    if (!trimmedEmail) {
      toast.error("Please enter your email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (trimmedContact && !/^\d{10}$/.test(trimmedContact)) {
      toast.error("Phone number must be a valid 10-digit number");
      return;
    }

    try {
      setLoading(true);
      let profileImageUrl = "";
      if (profileImage) {
        profileImageUrl = await CloudinaryServices.upload(profileImage);
      }

      const payload = {
        name: trimmedName,
        email: trimmedEmail,
        password: password,
        contact: trimmedContact,
        phone: trimmedContact,
        address: address.trim(),
        profileImage: profileImageUrl,
      };

      await UserServices.register(payload);
      toast.success("Registration successful! Please login.");
      nav("/");
    } catch (err) {
      console.error("Register error:", err);
      let errorMsg = "Error creating account. Please try again.";
      if (err.code === "auth/email-already-in-use") {
        errorMsg = "Email is already registered. Please login.";
      } else if (err.code === "auth/weak-password") {
        errorMsg = "Password should be at least 6 characters.";
      } else if (err.message) {
        errorMsg = err.message;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Register</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Register</li>
        </ol>
      </div>

      <div className="d-flex justify-content-center mt-5 mb-5">
        <div className="card shadow p-4 border-0" style={{ maxWidth: 800, width: "100%" }}>
          <h3 className="text-center text-primary mb-4">Create Student Account</h3>
          <form onSubmit={handleRegister}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Full Name *</label>
                <input
                  type="text"
                  className="w-100 form-control border py-3"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Email Address *</label>
                <input
                  type="email"
                  className="w-100 form-control border py-3"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Password *</label>
                <input
                  type="password"
                  className="w-100 form-control border py-3"
                  placeholder="Enter password (min 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Phone Number</label>
                <input
                  type="text"
                  className="w-100 form-control border py-3"
                  placeholder="Enter contact number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Address</label>
                <input
                  type="text"
                  className="w-100 form-control border py-3"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Profile Image</label>
                <input
                  type="file"
                  className="w-100 form-control border py-3"
                  accept="image/*"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                />
              </div>
            </div>

            <button
              className="w-100 btn form-control border-primary py-3 bg-primary text-white fw-bold mt-3 mb-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Submit Registration"}
            </button>

            <div className="text-center">
              <span>Already have an account? </span>
              <Link to="/" className="text-primary fw-bold">
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
