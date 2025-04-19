import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";

function Settings({ setDarkMode }) {
  const navigate = useNavigate();

  const [darkMode, setDarkModeState] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  const setDarkModeStorage = (value) => {
    localStorage.setItem("darkMode", value);
  };

  const [notifications, setNotifications] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = () => {
    console.log("Saved settings:", {
      darkMode,
      notifications,
      newPassword,
    });
    navigate(-1);
  };

  return (
    <div className="modal-overlay">
      <div className="settings-modal">
        <h1>Settings</h1>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => {
                const checked = e.target.checked;
                setDarkMode(checked);
                setDarkModeStorage(checked);
                setDarkModeState(checked);
              }}
            />
            Enable Dark Mode
          </label>
        </div>

        <div className="setting-item">
          <label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications((prev) => !prev)}
            />
            Enable Email Notifications
          </label>
        </div>

        <div className="setting-item">
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="setting-item">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter new password"
          />
        </div>

        <div className="button-group">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
