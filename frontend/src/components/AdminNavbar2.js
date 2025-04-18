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
          <img src="/images/logo2.png" />
        </div>
      </div>

      <div className="nav-tabs">
        

        <button
          className={location.pathname === "/admin-dashboard" ? "active" : ""}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </button>

        <button
          className={
            location.pathname === "/clubpage" ||
            location.pathname.startsWith("/clubs")
              ? "active"
              : ""
          }
          onClick={() => navigate("/clubpage")}
        >
          Clubs
        </button>

        <button
          className={
            location.pathname === "/eventpage" ||
            location.pathname.startsWith("/events") 
              ? "active"
              : ""
          }
          onClick={() => navigate("/eventpage")}
        >
          Events
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
              <button
                onClick={() =>
                  navigate("/profile", { state: { background: location } })
                }
              >
                Profile
              </button>
              <button
                onClick={() =>
                  navigate("/settings", { state: { background: location } })
                }
              >
                Settings
              </button>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default DashNavbar;
