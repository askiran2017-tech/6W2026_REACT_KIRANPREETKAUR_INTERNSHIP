import { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import {Outlet,useNavigate}from 'react-router-dom'
import { toast } from "react-toastify";
import AuthServices from "../../../Services/AuthServices";
export default function Layout(){
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
        if (UserType!=='user'||email==null){
            toast.error('unauthorized')
        nav('/')}
}, []);
        
    
    return(
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    )
}