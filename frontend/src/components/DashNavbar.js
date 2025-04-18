import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";

function DashNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const handleLogout = () => {
    navigate("/");
  };
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      <div onClick={() => navigate("/dashboard")}>
        <div className="navbar-logo">KAN</div>
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
          className={
            location.pathname === "/explore-clubs" ||
            location.pathname.startsWith("/clubs")
              ? "active"
              : ""
          }
          onClick={() => navigate("/explore-clubs")}
        >
          Explore Clubs
        </button>

        <button
          className={
            location.pathname === "/explore-events" ||
            location.pathname.startsWith("/events") ||
            location.pathname.startsWith("/purchase")
              ? "active"
              : ""
          }
          onClick={() => navigate("/explore-events")}
        >
          Explore Events
        </button>

        <button
          className={
            location.pathname === "/tickets" ||
            location.pathname.startsWith("/ticket")
              ? "active"
              : ""
          }
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

export default DashNavbar;
