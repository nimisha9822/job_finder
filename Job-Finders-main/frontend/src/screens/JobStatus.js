import React, { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import {AiFillEdit} from 'react-icons/ai'
import { useParams,useNavigate } from "react-router-dom";

export default function JobStatus() {
    const navigate=useNavigate()
  const { id,company, position, type, location } = useParams();
  const [user, setUser] = useState();
  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const response = await fetch(`http://localhost:8000/api/job/job-stats`, {
      method: "POST",
      body: JSON.stringify({ company, position }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setUser(data.job.appliedBy);
      console.log(data.job.appliedBy);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="container justify-content-center mt-5 align-item-center">
        <div className="card mt-3 mb-4" style={{ width: "1200px" }}>
          <div className="d-flex flex-row">
            <h3 className="text-primary fw-bold mx-3 mt-3">
              <MdLocationOn className="fw-bold text-primary fs-5 mx-2" />{" "}
              {location}
            </h3>
            <h4 className="ms-auto text-warning fs-3 fw-bold mt-3">
              <AiFillEdit
                onClick={() =>
                  navigate(
                    `/jobEdit/${id}/${company}/${position}/${type}/${location}`
                  )
                }
              />
            </h4>
          </div>

          <div className="card-body">
            <h5 className="card-title mx-3">Company: {company}</h5>
            <p className="mx-3  fs-5">Position: {position}</p>
            <p className="mx-3  fs-5">Type: {type}</p>
            <p className="card-text mx-3">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>

            {user && user.length > 0 ? (
              <>
                <h3 className="text-center fw-bod text-primary">
                  Applied By Student
                </h3>
                <ul class="list-group">
                  {user.map((u) => {
                    return (
                      <>
                        <list className="list-group-item">{u.Name}</list>
                      </>
                    );
                  })}
                </ul>
              </>
            ) : (
              <>
                <h3>No One has applied yet</h3>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
