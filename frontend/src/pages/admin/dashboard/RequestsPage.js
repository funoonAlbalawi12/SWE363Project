import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowLeft, FaCheckCircle, FaTimesCircle } from "react-icons/fa"; // Icons for actions
import "./requests.css"; // Import your CSS file

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // Back Button Handler
  const handleBackClick = () => {
    window.history.back(); // Navigate back to previous page
  };

  return (
    <div className="page-container">
      <div className="page-header">
        {/* Back Arrow */}
        <FaArrowLeft className="back-arrow" onClick={handleBackClick} />
        <h2 className="page-title">Requests</h2>
        <div className="page-actions">
          
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Requestor</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request) => (
              <tr key={request.id}>
                <td>{request.requestor}</td>
                <td>{request.type}</td>
                <td>
                  <span className={`status-badge ${request.status.toLowerCase()}`}>
                    {request.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn" onClick={() => alert(`Approving request: ${request.id}`)}>
                    <FaCheckCircle /> Approve
                  </button>
                  <button className="action-btn" onClick={() => alert(`Rejecting request: ${request.id}`)}>
                    <FaTimesCircle /> Reject
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-requests">No requests found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsPage;
