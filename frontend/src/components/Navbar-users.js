import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bell } from "lucide-react";


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login", { state: { backgroundLocation: location } });
  };

  const handleSignupClick = () => {
    navigate("/signup", { state: { backgroundLocation: location } });
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
          <div className="logo">KAN</div>
          <div className="nav-links">
            <a href="#">Dashboard</a>
            <a href="#">Clubs</a>
            <a href="#" className="active">Event</a>
          </div>
        </div>

      <div className="navbar-right">
      <Bell className="icon" />
          <div className="user-info">
            <div className="user-avatar" />
            <span>User Name</span>
          </div>
      </div>
    </nav>
  );
}

export default Navbar;
