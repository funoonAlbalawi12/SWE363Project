import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Kfupm Activity Network</h4>
          <p>Connecting you to the best activities at KFUPM.</p>
        </div>
        <div className="footer-section">
          <h4>Stay in the loop</h4>
          <input type="email" placeholder="Your email" />
          <button className="btn">Subscribe</button>
        </div>
      </div>
      <p className="footer-copyright">© 2025 Kfupm Activity Network</p>
    </footer>
  );
}

export default Footer;
