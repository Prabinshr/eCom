import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Login from "../../pages/login/Login";
import { logout } from "../../redux/apiCall";
import "./topbar.css";

export default function Topbar() {
  const user = useSelector((state)=>state.user.currentUser)
  const dispatch = useDispatch()
  const handleLogout = (e)=>{
    e.preventDefault();
    logout(dispatch);
    window.location.replace("/login")
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <Link to="/">
          
          <span className="logo">eMart</span>
          </Link>
        </div>
        <div className="topRight">
            <span className="username">{user.username}</span>
          
          <span className="logout" onClick={handleLogout}>Logout</span>
         
        </div>
        
      </div>
    </div>
  );
}
