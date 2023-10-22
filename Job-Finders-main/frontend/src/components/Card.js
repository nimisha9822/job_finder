import React from "react";
import {MdLocationOn} from 'react-icons/md'
import {IoMdAdd} from 'react-icons/io'
import {toast} from 'react-toastify'
import "../styeles/components.css"
import { useNavigate } from "react-router-dom";
export default function Card({jobId,location,type,position,company,button}) {
  const navigate= useNavigate();
  const applyJob=async(company,position,jobId)=>{
    const name = JSON.parse(localStorage.getItem("User")).name;
    const token = JSON.parse(localStorage.getItem("Token"))
    const response = await fetch(
      'http://localhost:8000/api/user/applyJob',
      {
        method: "POST",
        body:JSON.stringify({name,company,position,jobId}),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      toast.success(data.message);
      navigate('/profile')
    }else{
      toast.warning(data.message)
    }
  }
  return (
    <>
      <div className="card mt-3 mb-4" style={{ width: "900px" }}>
        <h3 className="text-primary fw-bold mx-3 mt-3"><MdLocationOn className="fw-bold text-primary fs-5 mx-2"/> {location}</h3>
        <div className="card-body">
          
          <h5 className="card-title mx-3">Company: {company}</h5>
          <p className="mx-3  fs-5">Position: {position}</p>
          <p className="mx-3  fs-5">Type: {type}</p>
          <p className="card-text mx-3">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        {button === "Apply" ? (<> <button href="#" className="btn btn-primary mx-3" onClick={()=>applyJob(company,position,jobId)}>
            {button}
          </button></>):(
            <>
            <button href="#" className="btn btn-primary mx-3" onClick={()=>navigate(`/job-status/${jobId}/${company}/${position}/${location}/${type}`)}>
            {button}
          </button>
            </>
          )
          
          }
        </div>
      </div>
    </>
  );
}
