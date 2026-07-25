import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UserServices from "../../../Services/UserServices";
import CloudinaryServices from "../../../Services/CloudinaryServices";


export default function Register() {

  
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contact, setContact] = useState('');
  const[profileImage,setProfileImage]=useState(null);
  const nav = useNavigate();

  async function Register(e) {
    e.preventDefault()
    try {
       let profileImageUrl=""
    if (profileImage){
      profileImageUrl= await CloudinaryServices.upload(profileImage)
    console.log("profileImageUrl:", profileImageUrl);
  }

      let Payload = {
        name: Name,
        email: email,
        password: password,
        contact: contact,
        profileImage:profileImageUrl
        };console.log("Payload:", Payload);
      let res = await UserServices.register(Payload)
      nav("/")
      toast.success('Register added')
    } catch (err) {
      console.log("error:", err)
      toast.error('error adding Register')
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
          <li className="breadcrumb-item">
            <Link to="/Pages">Pages</Link>
          </li>
          <li className="breadcrumb-item active text-white">Register</li>
        </ol>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <form onSubmit={Register} style={{ width: 800 }}>
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                className="w-100 form-control border-0 py-3 mb-4"
                placeholder="Enter name" onChange={(e) => setName(e.target.value)}
              /></div>
               <div className="col-md-6">
              <input
                type="email"
                className="w-100 form-control border-0 py-3 mb-4"
                placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
              /></div></div>
          <div className="row">
            <div className="col-md-6">
            <input
              type="password"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
            /></div>
             <div className="col-md-6">
            <input
              type="number"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter contact" onChange={(e) => setContact(e.target.value)}
            /></div></div>
            <div className="row">
            <div className="col-md-6">
            <input
              type="file"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter profileImage" onChange={(e) => setProfileImage(e.target.files[0])}
            /></div></div>

            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
              type="submit">
              Submit
            </button>
        </form>
      </div>
  
    </>
  )
}
