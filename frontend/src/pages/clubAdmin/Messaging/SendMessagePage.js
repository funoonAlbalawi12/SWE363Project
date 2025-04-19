import React from 'react';
import ClubAdminNavBar from '../../../components/ClubAdminNavBar2';
import Footer from '../../../components/Footer';
import SendMessageForm from './SendMessage';
import members from '../../../data/membersData';
import './SendMessage.css';

function SendMessagePage() {
  return (
    <>
      <ClubAdminNavBar />
      <div className="send-message-page">
        <div className="page-header">
          <h1>Send Message or Announcement</h1>
          <p>Select members to notify and write your message below.</p>
        </div>
        <div className="section">
          <SendMessageForm members={members} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SendMessagePage;
