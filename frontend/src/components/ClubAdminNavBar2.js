import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";


function ClubAdminNavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
      <div onClick={() => navigate("/clubadmin/dashboard")}>
        <div className="navbar-logo">KAN</div>
      </div>
      </div>

      <div className="nav-tabs">
        <button
          className={location.pathname === "/clubadmin/dashboard" ? "active" : ""}
          onClick={() => navigate("/clubadmin/dashboard")}
        >
          Dashboard
        </button>

        <button
          className={location.pathname.startsWith("/clubadmin/Events") ? "active" : ""}
          onClick={() => navigate("/clubadmin/Events")}
        >
          Events
        </button>

        <button
          className={location.pathname.startsWith("/clubadmin/members") ? "active" : ""}
          onClick={() => navigate("/clubadmin/members")}
        >
          Members
        </button>

        <button
          className={location.pathname === "/clubadmin/messages" ? "active" : ""}
          onClick={() => navigate("/clubadmin/messages")}
        >
          Announcements / Messaging
        </button>

        <button
          className={location.pathname === "/clubadmin/profile/edit" ? "active" : ""}
          onClick={() => navigate("/clubadmin/profile/edit")}
        >
          Club Profile
        </button>
      </div>

      <div className="navbar-right">
        <FiBell className="icon bell" />
        <div className="profile" onClick={toggleDropdown}>
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">Admin</span>
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
        <DarkModeToggle />
      </div>
    </nav>
  );
}

export default ClubAdminNavBar;