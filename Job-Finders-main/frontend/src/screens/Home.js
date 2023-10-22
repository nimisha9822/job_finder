import React, { useEffect, useState } from 'react'
import CompanyDashboard from "../components/CompanyDashboard"
import AdminDashboard from '../components/AdminDashboard';
import UserDashboard from '../components/UserDashboard';

export default function Home() {
  const [auth,setAuth]=useState();
  useEffect(()=>{
    var x= localStorage.getItem("User");
    if(x){
      x=JSON.parse(localStorage.getItem("User"));
      setAuth(x);
    }
  })
  return (
    <>
      {auth ? (
        auth.role === "Student" ? (
          <>
            <UserDashboard/>
          </>
        ):
        (
         auth.role === "Admin" ? (
          <> <AdminDashboard/></>
         ):
         (
          <CompanyDashboard/>
         )
        )

      ) : 

      (
        <>
          <h3 className='text-center mt-5 fw-bold text-primary'>Please LogIn</h3>
        </>
      )
      }
    </>
  )
}
