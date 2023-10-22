import React, { useState } from "react";
import "../../styeles/register.css";
import { Link,useNavigate, useParams } from "react-router-dom";
import { GiArchiveRegister } from "react-icons/gi";
import {toast} from 'react-toastify'
export default function ProfileEdit() {
    const {Name,LastName,Email,Location}=useParams();
    const navigate = useNavigate();
  const [name, setfirstName] = useState(Name);
  const [lastName, setlastName] = useState(LastName);
  const [email, setEmail] = useState(Email);
  const [location, setLocation] = useState(Location);
  const handleSubmit=async()=>{
    var token = JSON.parse(localStorage.getItem("Token"))
    var result = await fetch("http://localhost:8000/api/user/update-user",{
        method : "PUT",
        body : JSON.stringify({name,lastName,email,location}),
        headers:{
            'Content-Type' : 'application/json',
            "Authorization" : "Bearer "+token
        }
    })
    var data = await result.json();
    if(data.success){
        toast.success(data.message)
        localStorage.removeItem("User");
        localStorage.removeItem("Token")
        navigate('/login')
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
              Update User
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
          
          
          <button type="submit" className="    btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
