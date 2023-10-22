import React, { useEffect, useState } from "react";
import { BsFillBagFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    var find = JSON.parse(localStorage.getItem("User"));
    if (find) {
      setUser(find);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("Token");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-primary">
        <div className="container pt-2 pb-2">
          <Link className="navbar-brand text-white fw-bold fs-4" to="/">
            <BsFillBagFill className="text-white fw-bold fs-4 mx-2" />
            Job Finder
          </Link>
          <button
            className="navbar-toggler text-white background-white"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-white" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link text-white fs-5 " to="/login">
                      <FaUserAlt className="text-white fw-bold  mx-2" />
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle text-white fs-5"
                      to="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Welcome {user.name}
                    </Link>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {user.role === "Company" ? (
                        <li>
                          <Link className="dropdown-item" to="/createJob">
                            Create Job
                          </Link>
                        </li>
                      ) : (
                        <li>
                          <Link className="dropdown-item" to="/profile">
                            Profile
                          </Link>
                        </li>
                      )}
                      

                      <li>
                        <Link
                          className="dropdown-item"
                          to="#"
                          onClick={handleLogout}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
