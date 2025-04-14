import React from "react";
import "./Login.css";

import { Link, useNavigate, useLocation } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation || location;

  const handleCloseClick = () => {
    navigate("/");
  };
  const handleSubmitClick = () => {
    navigate("/dashboard");
  };

  const handleAdminClick = () => {
    navigate("/eventpage");
  };

  const handleAdminClubClick = () => {
    navigate("/admin-club-dashboard");
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <button className="close-btn" onClick={handleCloseClick}>
          ×
        </button>
        <h2>Welcome Back</h2>
        <form>
          <label>Email</label>
          <input type="email" placeholder="Enter email" />

          <label>Password</label>
          <input type="password" placeholder="Enter password" />

          <div className="role-buttons">
            <button type="button" onClick={handleAdminClick}>
              Admin
            </button>
            <button type="button" onClick={handleAdminClubClick}>
              Admin Club
            </button>
          </div>

          <button
            type="submit"
            className="login-btn"
            onClick={handleSubmitClick}
          >
            Login
          </button>
        </form>
        <p className="create-account">
          No account?{" "}
          <Link
            to="/signup"
            className="signup-link"
            state={{ backgroundLocation }}
          >
            Create One!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
