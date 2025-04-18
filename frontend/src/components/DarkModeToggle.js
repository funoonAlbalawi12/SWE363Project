import React, { useEffect, useState } from "react";

function DarkModeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", isDark);
    localStorage.setItem("darkMode", isDark);
  }, [isDark]);

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
      />
      <span className="slider">
        <span className="icon">{isDark ? "🌙" : "☀️"}</span>
      </span>
    </label>
  );
}

export default DarkModeToggle;
