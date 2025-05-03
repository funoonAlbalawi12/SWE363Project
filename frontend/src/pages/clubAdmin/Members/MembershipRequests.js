import React, { useState, useEffect } from 'react';
import './MembershipRequests.css';
import axios from 'axios';

function MembershipRequests() {
  useEffect(() => {
    axios
      .get('http://localhost:5001/api/club-membership?club=IEOM%20KFUPM%20Chapter')
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error('Error fetching membership requests:', err);
      });
  }, []);
  
  const handleAction = (id, action) => {
    axios
      .patch(`http://localhost:5001/api/club-membership/${id}`, { status: action })
      .then(() => {
        setRequests((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, status: action } : req
          )
        );
      })
      .catch((err) => {
        console.error('Failed to update request status:', err);
      });
  };



  return (
    <div className="membership-requests">
      <h2>Membership Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        requests.map((req) => (
          <div className="request-card" key={req.id}>
            <h3>{req.name}</h3>
            <p>Major: {req.major}</p>
            {req.status === 'pending' ? (
              <div className="actions">
                <button className="approve" onClick={() => handleAction(req.id, 'approved')}>
                  Approve
                </button>
                <button className="reject" onClick={() => handleAction(req.id, 'rejected')}>
                  Reject
                </button>
              </div>
            ) : (
              <p className={`status ${req.status}`}>
                {req.status === 'approved' ? 'Approved' : 'Rejected'}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MembershipRequests;
