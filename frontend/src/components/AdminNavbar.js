import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import "./Navbar.css";

function DashNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const sidebarRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);
  const handleLogout = () => navigate("/");

  const handleNavigate = (path) => {
    setShowMobileMenu(false);
    navigate(path);
  };

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.classList.contains("hamburger")
      ) {
        setShowMobileMenu(false);
      }
    };

    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMobileMenu]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowMobileMenu(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left-wrapper">
        <div className="hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>
        <div
          className="navbar-logo"
          onClick={() => handleNavigate("/admin-dashboard")}
        >
          KAN
        </div>
      </div>

      <div className="nav-tabs desktop-tabs">
        <button
          className={location.pathname === "/admin-dashboard" ? "active" : ""}
          onClick={() => handleNavigate("/admin-dashboard")}
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
          onClick={() => handleNavigate("/clubpage")}
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
          onClick={() => handleNavigate("/eventpage")}
        >
          Events
        </button>
      </div>

      {showMobileMenu && (
        <div className="sidebar-tabs" ref={sidebarRef}>
          <button onClick={() => handleNavigate("/admin-dashboard")}>
            Dashboard
          </button>
          <button onClick={() => handleNavigate("/clubpage")}>Clubs</button>
          <button onClick={() => handleNavigate("/eventpage")}>Events</button>
        </div>
      )}

      <div className="navbar-right">
        <FiBell className="icon-bell" />
        <div className="profile" onClick={toggleDropdown}>
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">admin</span>
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
