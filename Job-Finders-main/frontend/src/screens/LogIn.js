import React, { useState } from "react";
import "../styeles/register.css";
import { Link,useNavigate } from "react-router-dom";
import { BiSolidLogInCircle } from "react-icons/bi";
import {toast} from 'react-toastify'
export default function LogIn() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit=async()=>{
    var result = await fetch("http://localhost:8000/api/auth/login",{
        method : "Post",
        body : JSON.stringify({email,password}),
        headers:{
            'Content-Type' : 'application/json'
        }
    })
    var data = await result.json();
    if(data.success){
        toast.success(data.message)
        localStorage.setItem("User",JSON.stringify(data.findUser));
        localStorage.setItem("Token", JSON.stringify(data.token))
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
              <BiSolidLogInCircle className="fs- 4 fw-bold mx-2" />
              Existing User
            </h2>
          </div>
          <hr />
         
        
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
          
          <div className="d-flex flex-row">
            <p>
              New User ? <Link to="/register">SingUp</Link>
            </p>
          </div>
          <button type="submit" className="    btn btn-primary" onClick={handleSubmit}>
            LogIn
          </button>
        </div>
      </div>
    </>
  );
}
