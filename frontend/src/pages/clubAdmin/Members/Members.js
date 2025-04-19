import React, { useEffect, useRef } from 'react';
import ClubAdminNavBar from '../../../components/ClubAdminNavBar2';
import Footer from '../../../components/Footer';
import MembershipRequests from './MembershipRequests';
import ManageMembers from './ManageMembers';
import './MembersPage.css';
import { useLocation } from 'react-router-dom';

function MembersPage() {
  const location = useLocation();
  const membershipRef = useRef(null);
  const manageRef = useRef(null);

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const { scrollTo } = location.state;
      if (scrollTo === 'membership' && membershipRef.current) {
        membershipRef.current.scrollIntoView({ behavior: 'smooth' });
      } else if (scrollTo === 'manage' && manageRef.current) {
        manageRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location.state]);

  return (
    <div className="members-page">
      <ClubAdminNavBar />
      <div className="members-content">
        <h2 className="page-title">Club Members Management</h2>
        <p className="page-subtitle">Review membership requests and manage your current members.</p>
      </div>

      <div ref={membershipRef}>
        <div className="section">
          <div className="section-header">
            <h3>Membership Requests</h3>
          </div>
          <MembershipRequests />
        </div>
      </div>

      <hr className="divider" />

      <div ref={manageRef}>
        <div className="section">
          <div className="section-header">
            <h3>Manage Members</h3>
          </div>
          <ManageMembers />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MembersPage;
