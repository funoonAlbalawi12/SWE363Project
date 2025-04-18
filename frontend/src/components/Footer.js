import React from "react";

function Footer() {
  return (
    <footer className="main-footer">
      <div className="main-footer-content">
        <div className="main-footer-section">
          <h4>Kfupm Activity Network</h4>
          <p>Connecting you to the best activities at KFUPM.</p>
        </div>
        <div className="main-footer-section">
          <h4>Stay in the loop</h4>
          <input type="email" placeholder="Your email" />
          <button className="btn">Subscribe</button>
        </div>
      </div>
      <p className="main-footer-copyright">© 2025 Kfupm Activity Network</p>
    </footer>
  );
}

export default Footer;
