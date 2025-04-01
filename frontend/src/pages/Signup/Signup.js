import React from "react";
import "./Signup.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation || location;

  const handleCloseClick = () => {
    navigate("/");
  };
  const handleSubmitClick = () => {
    navigate("/dashboard");
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <button className="close-btn" onClick={handleCloseClick}>
          ×
        </button>
        <h2>Create Account</h2>
        <form>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <button
            type="submit"
            className="signup-btn"
            onClick={handleSubmitClick}
          >
            Sign Up
          </button>
        </form>
        <p className="login-redirect">
          Already have an account?{" "}
          <Link
            to="/login"
            state={{ backgroundLocation }}
            className="signup-link"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
