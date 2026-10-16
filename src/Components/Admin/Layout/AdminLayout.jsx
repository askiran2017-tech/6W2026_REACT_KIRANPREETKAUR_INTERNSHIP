import { useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthServices from "../../../Services/AuthServices";

export default function AdminLayout() {
    const nav = useNavigate();

    useEffect(() => {
        const isLoggedIn = AuthServices.isLoggedIn();
        const isAdmin = AuthServices.isAdmin();

        if (!isLoggedIn || !isAdmin) {
            toast.error("Unauthorized! Admin access only.");
            nav("/");
        }
    }, [nav]);

    if (!AuthServices.isAdmin()) {
        return null;
    }

    return (
        <>
            <AdminHeader />
            <Outlet />
            <AdminFooter />
        </>
    );
}