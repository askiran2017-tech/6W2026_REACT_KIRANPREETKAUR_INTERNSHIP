import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from "../../../Services/UserServices";
import AuthServices from "../../../Services/AuthServices";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  async function handleLogin(e) {
    e.preventDefault();
    const trimmedEmail = email.trim();
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
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        email: trimmedEmail,
        password: password,
      };

      const res = await UserServices.Login(payload);
      console.log("Login Response:", res);

      toast.success("Login Successful");

      if (res?.userType == 1 || res?.userType === "1" || res?.userType === "admin") {
        nav('/Admin/Dashboard');
      } else {
        nav('/ViewInternship');
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMsg = "Login failed. Please check your credentials.";
      if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        errorMsg = "Invalid email or password.";
      } else if (error.message) {
        errorMsg = error.message;
      }
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Login</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active text-white">Login</li>
        </ol>
      </div>

      <div className="d-flex justify-content-center mt-5 mb-5">
        <div className="col-lg-6 col-md-8 col-11 card shadow p-4 border-0">
          <h3 className="text-center text-primary mb-4">Welcome Back</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-bold">Email Address</label>
              <input
                type="email"
                className="w-100 form-control border py-3 mb-2"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-bold">Password</label>
              <input
                type="password"
                className="w-100 form-control border py-3 mb-2"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              className="w-100 btn form-control border-primary py-3 bg-primary text-white fw-bold mb-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center">
              <span>Don't have an account? </span>
              <Link to="/Register" className="text-primary fw-bold">
                Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
