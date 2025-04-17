import React from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";

function AdminNavbar() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#f9fafb",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      {/* شعار و روابط */}
      <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
        <div style={{ fontWeight: "bold", fontSize: "18px" }}>KAN</div>
        <div style={{ display: "flex", gap: "24px" }}>
          <button
            onClick={() => navigate("/eventpage")}
            style={{
              background: "none",
              border: "none",
              color: "#4f46e5",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Events
          </button>
          <button
            onClick={() => navigate("/clubpage")}
            style={{
              background: "none",
              border: "none",
              color: "#059669",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Clubs
          </button>
        </div>
      </div>

      {/* التنبيهات واسم المستخدم */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <Bell size={18} style={{ color: "#4b5563" }} />
        <div
          style={{
            width: "24px",
            height: "24px",
            backgroundColor: "#d1d5db",
            borderRadius: "50%",
          }}
        />
        <span style={{ fontSize: "14px", color: "#4b5563" }}>User Name</span>
      </div>
    </div>
  );
}

export default AdminNavbar;
