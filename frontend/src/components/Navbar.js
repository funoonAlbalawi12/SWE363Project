import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import "./Navbar.css";

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
      <div className="navbar-logo">KAN</div>
      <div className="navbar-buttons">
        <button className="btn" onClick={handleLoginClick}>
          Log in
        </button>
        <button className="btn" onClick={handleSignupClick}>
          Sign up
        </button>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
