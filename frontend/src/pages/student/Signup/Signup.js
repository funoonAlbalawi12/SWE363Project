import React, { useEffect } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };
  useEffect(() => {
    const dark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", dark);
  }, []);

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <button className="close-btn" onClick={handleCloseClick}>
          ×
        </button>

        <h2>Create Account</h2>

        <form onSubmit={handleSubmitClick}>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" />

          <label>Email</label>
          <input type="email" placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" placeholder="Create a password" />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="login-redirect">
          Already have an account?{" "}
          <Link to="/login" className="signup-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
