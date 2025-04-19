import React, { useState } from 'react';
import './MembershipRequests.css';

function MembershipRequests() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'Sarah Almutairi', major: 'Software Engineering', status: 'pending' },
    { id: 2, name: 'Mohammed Alqahtani', major: 'Computer Science', status: 'pending' },
    { id: 3, name: 'Laila Alsaud', major: 'IT', status: 'pending' },
  ]);

  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: action } : req
      )
    );
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
                {req.status === 'approved'
                  ? '✅ Approved'
                  : '❌ Rejected'}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default MembershipRequests;
