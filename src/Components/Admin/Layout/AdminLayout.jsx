import { useEffect } from "react";
import AdminFooter from "./AdminFooter";
import AdminHeader from "./AdminHeader";
import {Outlet,useNavigate}from 'react-router-dom'
import { toast } from "react-toastify";
import AuthServices from "../../../Services/AuthServices";
export default function AdminLayout(){
    const nav = useNavigate();
    function getUserType(){
        const res=AuthServices.getUserType()
        return res;
    }
    function getEmail(){
        const res=AuthServices.getEmail()
        return res;
    }
    useEffect(() => {
const email=getEmail()
        const UserType=getUserType()
        if (UserType!=='Admin'||email==null){
            toast.error('unauthorized')
        nav('/')}
}, []);
        
    
    return(
        <>
        <AdminHeader/>
        <Outlet/>
        <AdminFooter/>
        </>
    )
}