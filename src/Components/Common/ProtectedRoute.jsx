import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthServices from "../../Services/AuthServices";
import { toast } from "react-toastify";

export default function ProtectedRoute({ children, userType = 2 }) {
  const isLoggedIn = AuthServices.isLoggedIn();
  const isAdmin = AuthServices.isAdmin();
  const isStudent = AuthServices.isStudent();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.error("Please login first to access this page");
    } else if (userType == 1 && !isAdmin) {
      toast.error("Access denied. Admin access only.");
    } else if (userType == 2 && !isStudent) {
      toast.error("Access denied. Student portal only.");
    }
  }, [isLoggedIn, isAdmin, isStudent, userType]);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (userType == 1 && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (userType == 2 && !isStudent) {
    return <Navigate to="/Admin/Dashboard" replace />;
  }

  return children;
}
