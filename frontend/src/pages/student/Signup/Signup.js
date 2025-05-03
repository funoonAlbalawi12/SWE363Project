// import React, { useEffect } from "react";
// import "./Signup.css";
// import { Link, useNavigate } from "react-router-dom";

// function Signup() {
//   const navigate = useNavigate();

//   const handleCloseClick = () => {
//     navigate("/");
//   };

//   const handleSubmitClick = (e) => {
//     e.preventDefault();
//     navigate("/dashboard");
//   };
//   useEffect(() => {
//     const dark = localStorage.getItem("darkMode") === "true";
//     document.body.classList.toggle("dark", dark);
//   }, []);

//   return (
//     <div className="signup-wrapper">
//       <div className="signup-card">
//         <button className="close-btn" onClick={handleCloseClick}>
//           ×
//         </button>

//         <h2>Create Account</h2>

//         <form onSubmit={handleSubmitClick}>
//           <label>Full Name</label>
//           <input type="text" placeholder="Enter your full name" />

//           <label>Email</label>
//           <input type="email" placeholder="Enter your email" />

//           <label>Password</label>
//           <input type="password" placeholder="Create a password" />

//           <button type="submit" className="signup-btn">
//             Sign Up
//           </button>
//         </form>

//         <p className="login-redirect">
//           Already have an account?{" "}
//           <Link to="/login" className="signup-link">
//             Log in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Signup;



import React, { useEffect, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import API from "../../../axios"; 

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleCloseClick = () => {
    navigate("/");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/api/users/register", formData);

      // Store user ID or token if needed
      localStorage.setItem("userId", res.data._id);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Failed to register. Please try again.");
    }
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
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a password"
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        {error && <p className="error-message">{error}</p>}

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
