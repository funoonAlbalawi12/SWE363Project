import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate("/login", { state: { background: location } });
  };

  const handleSignupClick = () => {
    navigate("/signup", { state: { background: location } });
  };

  return (
    <nav className="main-navbar">
      <div className="main-navbar-logo">KAN</div>
      <div className="main-navbar-buttons">
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
