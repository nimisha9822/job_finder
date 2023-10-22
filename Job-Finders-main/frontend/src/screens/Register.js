import React, { useState } from "react";
import "../styeles/register.css";
import { Link,useNavigate } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import {toast} from 'react-toastify'
export default function Register() {
    const navigate = useNavigate();
  const [name, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [role,setRole]=useState("Student")
  const handleSubmit=async()=>{
    var result = await fetch("http://localhost:8000/api/auth/register",{
        method : "Post",
        body : JSON.stringify({name,lastName,email,password,location,role}),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    var data = await result.json();
    if(data.success){
        toast.success(data.message)
        navigate('/')
    }else{
        toast.warning(data.message);
    }
  }
  return (
    <>
      <div className="form-container">
        <div className="card px-5 py-5">
          <div className=" mt-2">
            <h2 className="text-center fs-2">
              <GiArchiveRegister className="fs- 4 fw-bold mx-2" />
              New User
            </h2>
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
        
              value={name}
              onChange={(e) => setfirstName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
      
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <select value={role} className="px-3 py-3" onChange={(e)=>setRole(e.target.value)}>
              <option value="disable">Role</option>
              <option value="Student">Student</option>
              
              <option value="Company">Company</option>
            </select>
          </div>
          <div className="d-flex flex-row">
            <p>
              Already Registered ? <Link to="/login">LogIn</Link>
            </p>
          </div>
          <button type="submit" className="    btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
