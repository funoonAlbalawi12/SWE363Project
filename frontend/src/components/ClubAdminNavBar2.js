import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";

function ClubAdminNavBar() {
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

  // Close sidebar on outside click
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

  // Auto-close on screen resize
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
          onClick={() => handleNavigate("/clubadmin/dashboard")}
        >
          KAN
        </div>
      </div>

      <div className="nav-tabs desktop-tabs">
        <button
          className={
            location.pathname === "/clubadmin/dashboard" ? "active" : ""
          }
          onClick={() => handleNavigate("/clubadmin/dashboard")}
        >
          Dashboard
        </button>
        <button
          className={
            location.pathname.startsWith("/clubadmin/events") ? "active" : ""
          }
          onClick={() => handleNavigate("/clubadmin/events")}
        >
          Events
        </button>
        <button
          className={
            location.pathname.startsWith("/clubadmin/members") ? "active" : ""
          }
          onClick={() => handleNavigate("/clubadmin/members")}
        >
          Members
        </button>
        <button
          className={
            location.pathname === "/clubadmin/messages" ? "active" : ""
          }
          onClick={() => handleNavigate("/clubadmin/messages")}
        >
          Announcements / Messaging
        </button>
        <button
          className={
            location.pathname === "/clubadmin/profile/edit" ? "active" : ""
          }
          onClick={() => handleNavigate("/clubadmin/profile/edit")}
        >
          Club Profile
        </button>
      </div>

      {showMobileMenu && (
        <div className="sidebar-tabs" ref={sidebarRef}>
          <button onClick={() => handleNavigate("/clubadmin/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => handleNavigate("/clubadmin/events")}>
            Events
          </button>
          <button onClick={() => handleNavigate("/clubadmin/members")}>
            Members
          </button>
          <button onClick={() => handleNavigate("/clubadmin/messages")}>
            Announcements / Messaging
          </button>
          <button onClick={() => handleNavigate("/clubadmin/profile/edit")}>
            Club Profile
          </button>
        </div>
      )}

      <div className="navbar-right">
        <FiBell className="icon-bell" />
        <div className="profile" onClick={toggleDropdown}>
          <div className="avatar">
            <FiUser />
          </div>
          <span className="username">Khulud</span>
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
