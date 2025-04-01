import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";

function DashNavbar() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-left">
        <div className="navbar-logo" onClick={() => navigate("/dashboard")}>
          KAN
        </div>
      </div>

      <div className="nav-tabs">
        <button className="active">Dashboard</button>
        <button onClick={() => navigate("/clubs")}>Explore Clubs</button>
        <button onClick={() => navigate("/events")}>Explore Events</button>
        <button onClick={() => navigate("/tickets")}>My tickets</button>
      </div>

      <div className="navbar-right">
        <FiBell className="icon bell" />
        <div className="profile" onClick={toggleDropdown}>
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">Khulud Alotaibi</span>
          <span className="dropdown">▾</span>

          {showDropdown && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/profile")}>Profile</button>
              <button onClick={() => navigate("/settings")}>Settings</button>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DashNavbar;
