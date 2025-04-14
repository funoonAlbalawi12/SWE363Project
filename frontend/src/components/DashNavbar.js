import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";

function DashNavbar() {
  const location = useLocation();

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
          <button
            className={location.pathname === "/home" ? "active" : ""}
            onClick={() => navigate("/home")}
          >
            Home
          </button>

          <button
            className={location.pathname === "/dashboard" ? "active" : ""}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </button>

          <button
            className={location.pathname === "/explore-clubs" || location.pathname.startsWith("/clubs") ? "active" : ""}
            onClick={() => navigate("/explore-clubs")}
          >
            Explore Clubs
          </button>

          <button
            className={location.pathname === "/explore-events" ? "active" : ""}
            onClick={() => navigate("/explore-events")}
          >
            Explore Events
          </button>

          <button
            className={location.pathname === "/tickets" ? "active" : ""}
            onClick={() => navigate("/tickets")}
          >
            My tickets
          </button>
        </div>

        <div className="navbar-right">
          <FiBell className="icon bell" />
          <div className="profile" onClick={toggleDropdown}>
            <div className="avatar">
              <FiUser />
            </div>
            <span className="username">Khulud </span>
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
