import { toast } from "react-toastify";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import UserServices from "../../../Services/UserServices"
import AuthServices from "../../../Services/AuthServices";


export default function Login() {
  let [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const nav = useNavigate();

  async function Login(e) {
    e.preventDefault()
    try {

      let payload = {

        email: email,
        password: password,

      }
      let res = await UserServices.Login(payload);
      console.log("Login Response:", res);


      await AuthServices.setData(res);

      toast.success("Login Successful");
      setLoading(false);

      if (res.userType == 'admin') {
        nav('/admin')
      } else {
        nav('/')
      }

    } catch (error) {
      setLoading(false)
      console.log(error);
      toast.error(error.code)

    }
    finally {
      setLoading(false)
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
          <li className="breadcrumb-item">
            <Link to="/Pages">Pages</Link>
          </li>
          <li className="breadcrumb-item active text-white">Login</li>
        </ol>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="col-lg-7">
          <form onSubmit={Login} action="" className="">


            <input
              type="email"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
              type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
