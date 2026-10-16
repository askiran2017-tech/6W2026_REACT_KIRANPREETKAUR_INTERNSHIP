import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Firebase/FirebaseConfig";

import ProtectedRoute from "./Components/Common/ProtectedRoute";

import AdminLayout from "./Components/Admin/Layout/AdminLayout";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import ManageStudent from "./Components/Admin/Student/ManageStudent";
import AddStudent from "./Components/Admin/Student/AddStudent";
import EditStudent from "./Components/Admin/Student/EditStudent";
import ManageCategory from "./Components/Admin/Category/ManageCategory";
import AddCategory from "./Components/Admin/Category/AddCategory";
import EditCategory from "./Components/Admin/Category/EditCategory";
import ManageInternship from "./Components/Admin/Internship/ManageInternship";
import AddInternship from "./Components/Admin/Internship/AddInternship";
import EditInternship from "./Components/Admin/Internship/EditInternship";
import ManageHackathon from "./Components/Admin/Hackathon/ManageHackathon";
import EditHackathon from "./Components/Admin/Hackathon/EditHackathon";
import AddHackathon from "./Components/Admin/Hackathon/AddHackathon";
import ViewApplication1 from "./Components/Admin/Application1/ViewApplication1";
import AddResult from "./Components/Admin/Result/AddResult";
import EditResult from "./Components/Admin/Result/EditResult";
import ManageResult from "./Components/Admin/Result/ManageResult";

import Layout from "./Components/User/Layout/Layout";
import Login from "./Components/User/Auth/Login";
import Register from "./Components/User/Auth/Register";
import ViewCategory from "./Components/User/Category/ViewCategory";
import ViewInternship from "./Components/User/Internship/ViewInternship";
import ManageApplication from "./Components/User/Application/ManageApplication";
import EditApplication from "./Components/User/Application/EditApplication";
import AddApplication from "./Components/User/Application/AddApplication";
import ViewResult from "./Components/User/Result/ViewResult";
import ViewHackathon from "./Components/User/Hackathon/ViewHackathon";
import Profile from "./Components/User/Profile/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/Admin"
            element={
              <ProtectedRoute userType={1}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="ManageStudent" element={<ManageStudent />} />
            <Route path="AddStudent" element={<AddStudent />} />
            <Route path="Student/EditStudent/:id" element={<EditStudent />} />
            <Route path="ManageCategory" element={<ManageCategory />} />
            <Route path="AddCategory" element={<AddCategory />} />
            <Route path="Category/EditCategory/:id" element={<EditCategory />} />
            <Route path="ManageInternship" element={<ManageInternship />} />
            <Route path="AddInternship" element={<AddInternship />} />
            <Route path="Internship/EditInternship/:id" element={<EditInternship />} />
            <Route path="ManageHackathon" element={<ManageHackathon />} />
            <Route path="AddHackathon" element={<AddHackathon />} />
            <Route path="Hackathon/EditHackathon/:id" element={<EditHackathon />} />
            <Route path="ViewApplication1" element={<ViewApplication1 />} />
            <Route path="ManageResult" element={<ManageResult />} />
            <Route path="AddResult" element={<AddResult />} />
            <Route path="Result/EditResult/:id" element={<EditResult />} />
          </Route>

          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="ViewCategory" element={<ViewCategory />} />
            <Route path="ViewInternship" element={<ViewInternship />} />
            <Route path="ViewHackathon" element={<ViewHackathon />} />

            <Route
              path="ManageApplication"
              element={
                <ProtectedRoute userType={2}>
                  <ManageApplication />
                </ProtectedRoute>
              }
            />
            <Route
              path="AddApplication"
              element={
                <ProtectedRoute userType={2}>
                  <AddApplication />
                </ProtectedRoute>
              }
            />
            <Route
              path="Application/EditApplication/:id"
              element={
                <ProtectedRoute userType={2}>
                  <EditApplication />
                </ProtectedRoute>
              }
            />
            <Route
              path="ViewResult"
              element={
                <ProtectedRoute userType={2}>
                  <ViewResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="Profile"
              element={
                <ProtectedRoute userType={2}>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
