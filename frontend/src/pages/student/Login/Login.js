
import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../axios"; // Import axios instance

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const dark = localStorage.getItem("darkMode") === "true";
    document.body.classList.toggle("dark", dark);
  }, []);

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/api/users/login", { email, password });
      const { token, role, user } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", user._id);

      // Navigate based on role
      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "clubadmin") {
        navigate("/admin-club-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <button className="close-btn" onClick={handleCloseClick}>
          ×
        </button>

        <h2>Welcome Back</h2>

        <form onSubmit={handleSubmitClick}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
