import React, { useEffect, useState } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import { AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const [user, setUser] = useState();
  const [applications, setApplications] = useState();
  const navigate=useNavigate();
  const fetchData = async () => {

    const id = JSON.parse(localStorage.getItem("User"))._id;
    const token = JSON.parse(localStorage.getItem("Token"));
    const response = await fetch(
      "http://localhost:8000/api/user/findAppliedJob",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.success) {
      setApplications(data.appplied);
      console.log(data.appplied);
    }
  };
  useEffect(() => {
    var x = JSON.parse(localStorage.getItem("User"));
    if (x) {
      setUser(x);
    }
    fetchData();
  }, []);
  return (
    <>
      {user ? (
        <>
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="container justify-content-center mt-5 align-item-center">
                  <div className="card mt-3 mb-4" style={{ width: "600px" }}>
                    <div className="d-flex flex-row">
                      <h3 className=" text-center text-primary fw-bold mx-3 mt-3">
                        <BiSolidUserCircle className="fw-bold text-primary fs-5 mx-2" />
                        {user.name}
                        {user.lastName}
                      </h3>
                      <h4 className="ms-auto text-warning fs-3 fw-bold mt-3">
                        <AiFillEdit  onClick={()=>navigate(`/userEdit/${user.name}/${user.lastName}/${user.email}/${user.location}`)}/>
                      </h4>
                    </div>

                    <hr />
                    <div className="card-body">
                      <h5 className="card-title mx-3">Email : {user.email}</h5>
                      <p className="mx-3  fs-5">Location : {user.location}</p>
                      <p className="card-text mx-3">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <h4 className="text-center text-primary mt-5 mb-5">
                  Company's You Applied
                </h4>
                <table class="table mx-5">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Company</th>
                      <th scope="col">Position</th>
                      <th scope="col">Status</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications && applications.length > 0 ? (
                      applications.map((application,idx) => {
                        return (
                          <>
                            <tr>
                              <th scope="row">{idx+1}</th>
                              <td>{application.company}</td>
                              <td>{application.position}</td>
                              <td>{application.status}</td>
                            </tr>
                          </>
                        );
                      })
                    ) : (
                      <>
                        <h3>Not Applied Anywhere</h3>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h3>Something Went Wrong</h3>
        </>
      )}
    </>
  );
}
