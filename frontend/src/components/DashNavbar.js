// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FiBell, FiUser } from "react-icons/fi";
// import DarkModeToggle from "./DarkModeToggle";
// import "./Navbar";

// function DashNavbar() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showMobileMenu, setShowMobileMenu] = useState(false);
//   const sidebarRef = useRef(null);

//   const toggleDropdown = () => setShowDropdown(!showDropdown);
//   const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

//   const handleNavigate = (path) => {
//     setShowMobileMenu(false);
//     navigate(path);
//   };

//   const handleLogout = () => {
//     navigate("/");
//   };

//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("darkMode") === "true";
//   });

//   useEffect(() => {
//     document.body.classList.toggle("dark", darkMode);
//     localStorage.setItem("darkMode", darkMode);
//   }, [darkMode]);

//   // Close mobile menu when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         sidebarRef.current &&
//         !sidebarRef.current.contains(e.target) &&
//         !e.target.classList.contains("hamburger")
//       ) {
//         setShowMobileMenu(false);
//       }
//     };

//     if (showMobileMenu) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showMobileMenu]);

//   return (
//     <nav className="navbar">
//       <div className="navbar-left-wrapper">
//         <div className="hamburger" onClick={toggleMobileMenu}>
//           ☰
//         </div>
//         <div
//           className="navbar-logo"
//           onClick={() => handleNavigate("/dashboard")}
//         >
//           KAN
//         </div>
//       </div>

//       {/* Center tabs (desktop only) */}
//       <div className="nav-tabs desktop-tabs">
//         <button
//           className={location.pathname === "/home" ? "active" : ""}
//           onClick={() => handleNavigate("/home")}
//         >
//           Home
//         </button>

//         <button
//           className={location.pathname === "/dashboard" ? "active" : ""}
//           onClick={() => handleNavigate("/dashboard")}
//         >
//           Dashboard
//         </button>

//         <button
//           className={
//             location.pathname === "/explore-clubs" ||
//             location.pathname.startsWith("/clubs")
//               ? "active"
//               : ""
//           }
//           onClick={() => handleNavigate("/explore-clubs")}
//         >
//           Explore Clubs
//         </button>

//         <button
//           className={
//             location.pathname === "/explore-events" ||
//             location.pathname.startsWith("/events") ||
//             location.pathname.startsWith("/purchase")
//               ? "active"
//               : ""
//           }
//           onClick={() => handleNavigate("/explore-events")}
//         >
//           Explore Events
//         </button>

//         <button
//           className={
//             location.pathname === "/tickets" ||
//             location.pathname.startsWith("/ticket")
//               ? "active"
//               : ""
//           }
//           onClick={() => handleNavigate("/tickets")}
//         >
//           My Tickets
//         </button>
//       </div>

//       {/* Sidebar for mobile */}
//       {showMobileMenu && (
//         <div className="sidebar-tabs" ref={sidebarRef}>
//           <button onClick={() => handleNavigate("/home")}>Home</button>
//           <button onClick={() => handleNavigate("/dashboard")}>
//             Dashboard
//           </button>
//           <button onClick={() => handleNavigate("/explore-clubs")}>
//             Explore Clubs
//           </button>
//           <button onClick={() => handleNavigate("/explore-events")}>
//             Explore Events
//           </button>
//           <button onClick={() => handleNavigate("/tickets")}>My Tickets</button>
//         </div>
//       )}

//       {/* Right side */}
//       <div className="navbar-right">
//         <FiBell className="icon bell" />
//         <div className="profile" onClick={toggleDropdown}>
//           <div className="avatar">
//             <FiUser />
//           </div>
//           <span className="username">Khulud</span>
//           <span className="dropdown">▾</span>

//           {showDropdown && (
//             <div className="dropdown-menu">
//               <button
//                 onClick={() =>
//                   navigate("/profile", {
//                     state: { backgroundLocation: location },
//                   })
//                 }
//               >
//                 Profile
//               </button>
//               <button
//                 onClick={() =>
//                   navigate("/settings", {
//                     state: { backgroundLocation: location },
//                   })
//                 }
//               >
//                 Settings
//               </button>
//               <button onClick={handleLogout}>Log out</button>
//             </div>
//           )}
//         </div>
//         <DarkModeToggle />
//       </div>
//     </nav>
//   );
// }

// export default DashNavbar;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiBell, FiUser } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import "./Navbar.css";

function DashNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const sidebarRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setShowMobileMenu((prev) => !prev);

  const handleNavigate = (path) => {
    setShowMobileMenu(false);
    navigate(path);
  };

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

  // Close sidebar when clicking outside
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

  // Hide sidebar on resize (>= 769px)
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
          onClick={() => handleNavigate("/dashboard")}
        >
          KAN
        </div>
      </div>

      {/* Desktop Center Tabs */}
      <div className="nav-tabs desktop-tabs">
        <button
          className={location.pathname === "/home" ? "active" : ""}
          onClick={() => handleNavigate("/home")}
        >
          Home
        </button>
        <button
          className={location.pathname === "/dashboard" ? "active" : ""}
          onClick={() => handleNavigate("/dashboard")}
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
          onClick={() => handleNavigate("/explore-clubs")}
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
          onClick={() => handleNavigate("/explore-events")}
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
          onClick={() => handleNavigate("/tickets")}
        >
          My Tickets
        </button>
      </div>

      {/* Mobile Sidebar */}
      {showMobileMenu && (
        <div className="sidebar-tabs" ref={sidebarRef}>
          <button onClick={() => handleNavigate("/home")}>Home</button>
          <button onClick={() => handleNavigate("/dashboard")}>
            Dashboard
          </button>
          <button onClick={() => handleNavigate("/explore-clubs")}>
            Explore Clubs
          </button>
          <button onClick={() => handleNavigate("/explore-events")}>
            Explore Events
          </button>
          <button onClick={() => handleNavigate("/tickets")}>My Tickets</button>
        </div>
      )}

      {/* Right Side */}
      <div className="navbar-right">
        <FiBell className="icon bell" />
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
                  navigate("/profile", {
                    state: { backgroundLocation: location },
                  })
                }
              >
                Profile
              </button>
              <button
                onClick={() =>
                  navigate("/settings", {
                    state: { backgroundLocation: location },
                  })
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
