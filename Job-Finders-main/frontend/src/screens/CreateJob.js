import React, { useState } from "react";
import "../styeles/register.css";
import { Link,useNavigate } from "react-router-dom";
import { MdCreateNewFolder } from "react-icons/md";
import {toast} from 'react-toastify'
export default function CreateJob() {
    const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workType, setWorkType] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const handleSubmit=async()=>{
    const token = JSON.parse(localStorage.getItem("Token"))
    var result = await fetch("http://localhost:8000/api/job/create-job",{
        method : "Post",
        body : JSON.stringify({company,position,workType,workLocation}),
        headers:{
            'Content-Type' : 'application/json',
            'Authorization' : "Bearer "+token
        }
    })
    var data = await result.json();
    if(data.success){
        toast.success(data.message)
        // navigate('/')
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
              <MdCreateNewFolder className="fs- 4 fw-bold mx-2" />
              Create A Job
            </h2>
          </div>
          <hr />
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Company
            </label>
            <input
              type="text"
              className="form-control"
        
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control"
      
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Work-Type
            </label>
            
            <select className="mx-2 px-2  py-2" value={workType} onChange={(e)=>setWorkType(e.target.value)}>
               <option value="disable">Choose</option>
               <option value="part-time">Part-Time</option>
                <option value="full-time">Full-Time</option>
                <option value="internship">Internship</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Location
            </label>
            <input
              type="text"
              className="form-control"
      
              value={workLocation}
              onChange={(e) => setWorkLocation(e.target.value)}
            />
          </div>
          
          
          
          
          <button type="submit" className="    btn btn-primary" onClick={handleSubmit}>
            Create
          </button>
        </div>
      </div>
    </>
  );
}
