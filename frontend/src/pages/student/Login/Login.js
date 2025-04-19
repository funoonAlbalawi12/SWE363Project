import React, { useEffect } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const handleAdminClick = () => {
    navigate("/admin-dashboard");
  };

  const handleAdminClubClick = () => {
    navigate("/admin-club-dashboard");
  };
  useEffect(() => {
    const dark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", dark);
  }, []);

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <button className="close-btn" onClick={handleCloseClick}>
          ×
        </button>

        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmitClick}>
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

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="create-account">
          No account?{" "}
          <Link to="/signup" className="signup-link">
            Create One!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
