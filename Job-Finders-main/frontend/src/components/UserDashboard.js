import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import "../styeles/home.css";
export default function UserDashboard() {
  const [Jobs, setJobs] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filterLocation, setFilterLocation] = useState("all");
  const [filterWorkType, setFilterWorkType] = useState("all");
  const [filterPosition, setFilterPosition] = useState("all");
  const [sortBy, setSortBy] = useState("a-z");
  const handleFilter=()=>{
    fetchData();
  }
  const fetchData = async () => {
    const token = JSON.parse(localStorage.getItem("Token"));
    const response = await fetch(
      `http://localhost:8000/api/job/get-userjobs?&search=${search}&location=${filterLocation}&position=${filterPosition}&workType=${filterWorkType}&sort=${sortBy}`,
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
      setJobs(data.jobs);
    }
  };
  const handleNext = () => {
    var x = page;
    setPage(x + 1);
    fetchData();
  };
  const handlePrev = () => {
    var x = page;
    if (x > 1) {
      setPage(x - 1);
      fetchData();
    }
  };
  const handleSearch = () => {
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="banner">
        <div className="form d-flex flex-row">
          <input
            className="form-control me-2 pt-2 pb-2 rounded fw-bold fs-5"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="btn pt-2 rounded pb-2 mx-2 btn-primary px-3 text-white fw-bold"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
      <div className="mt-5 container">
        <div className="row">
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4">
            <div className="container-fluid">
              <div className="row">
                <div className="card mt-3 mb-3" style={{ maxWidth: "300px" }}>
                  <div className="card-title mt-2 mb-1 mx-1">
                    <h3 className="mx-2 fw-bold fs-5 text-primary">
                      Filter by Location
                    </h3>
                  </div>
                  <div className="card-body mx-1">
                    <select className="py-2 px-2 fs-5" value={filterLocation} onChange={(e)=>setFilterLocation(e.target.value)}>
                      <option value="disable"> Select location</option>
                      <option value="China">China</option>
                      <option value="Poland">Poland</option>
                      <option value="Sweden">Sweden</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="card mt-3 mb-3" style={{ maxWidth: "300px" }}>
                  <div className="card-title mt-2 mb-1 mx-1">
                    <h3 className="mx-2 fw-bold fs-5 text-primary">
                      Filter by Position
                    </h3>
                  </div>
                  <div className="card-body mx-1">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Assistant"
                        onClick={(e)=>setFilterPosition(e.target.value)}
                        id="flexCheckDefault"
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Assistant
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Designer"
                        onClick={(e)=>setFilterPosition(e.target.value)}
                        id="flexCheckChecked"
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Designer
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Web Developer"
                        onClick={(e)=>setFilterPosition(e.target.value)}
                        id="flexCheckChecked"
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Web Developer
                      </label>
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value="Software Engineer"
                        onClick={(e)=>setFilterPosition(e.target.value)}
                        id="flexCheckChecked"
                      />
                      <label class="form-check-label" for="flexCheckChecked">
                        Software Engineer
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card mt-3 mb-3" style={{ maxWidth: "300px" }}>
                  <div className="card-title mt-2 mb-1 mx-1">
                    <h3 className="mx-2 fw-bold fs-5 text-primary">
                      Filter by WorkType
                    </h3>
                  </div>
                  <div className="card-body mx-1" >
                    <select className="py-2 px-2 fs-5" value={filterWorkType} onChange={(e)=>setFilterWorkType(e.target.value)}>
                      <option value="disable">select workType</option>
                      <option value="full-time">full-time</option>
                      <option value="part-time">part-time</option>
                      <option value="internship">internship</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="card mt-3 mb-3" style={{ maxWidth: "300px" }}>
                  <div className="card-title mt-2 mb-1 mx-1">
                    <h3 className="mx-2 fw-bold fs-5 text-primary">Sort by</h3>
                  </div>
                  <div className="card-body mx-1">
                    <select className="py-2 px-2 fs-5" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
                      <option value="a-z">a-z</option>
                      <option value="A-Z">A-Z</option>
                      <option value="latest">latest</option>
                      <option value="oldests">oldest</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row ">
                <button
                  className="btn btn-primary text-white mt-4"
                  style={{ maxWidth: "300px" }}
                  onClick={handleFilter}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8">
            {Jobs ? (
              <>
                {Jobs.map((job) => {
                  return (
                    <>
                      <Card
                        jobId ={job._id}
                        location={job.workLocation}
                        type={job.workType}
                        position={job.position}
                        company={job.company}
                        button="Apply"
                      />
                    </>
                  );
                })}
                {Jobs.length > 0  && Jobs.length>=10? (
                  <>
                    <div class="d-flex mt-3 mb-3 ">
                      <button
                        className="btn ms-auto btn-primary px-4 fs-5 fw-bold text-white mx-2"
                        onClick={handlePrev}
                      >
                        Prev
                      </button>
                      <button
                        className="btn btn-primary px-4 fs-5 fw-bold  text-white  "
                        onClick={handleNext}
                      >
                        Next
                      </button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <h3>Something went wrong</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
