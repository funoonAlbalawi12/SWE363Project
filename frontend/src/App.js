import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/student/LandingPage/LandingPage";
import Login from "./pages/student/Login/Login";
import Signup from "./pages/student/Signup/Signup";
import Dashboard from "./pages/student/Dashboard/Dashboard";  // Student Dashboard
import AdminDashboard from "./pages/admin/dashboardpage/dashboard";  // Admin Dashboard
import { useLocation } from "react-router-dom";
import Settings from "./pages/student/Settings/Settings";
import Profile from "./pages/student/Profile/Profile";
import ExploreClubs from "./pages/student/ExploreClubs/ExploreClubs";
import Home from "./pages/student/Home/Home";
import ClubProfile from "./pages/student/ClubProfile/ClubProfile";
import EventPage from "./pages/admin/eventpage/eventpage";
import ClubsPage from "./pages/admin/clubpage/clubpage";
import ExploreEvents from "./pages/student/ExploreEvents/ExploreEvents";
import Tickets from "./pages/student/Tickets/Tickets";
import ManageMembers from "./pages/clubAdmin/Members/ManageMembers";
import SendMessage from "./pages/clubAdmin/Messaging/SendMessage";
import EditProfile from "./pages/clubAdmin/Profile/EditProfile";
import MembershipRequests from "./pages/clubAdmin/Membership/MembershipRequests";
import AnnouncementsEvents from "./pages/clubAdmin/Announcements/AnnouncementsEvents";
import EventDetails from "./pages/student/EventDetails/EventDetails";
import PurchaseTicket from "./pages/student/PurchaseTicket/PurchaseTicket";
import TicketSuccess from "./pages/student/TicketSuccess/TicketSuccess";
import TicketDetails from "./pages/student/TicketDetails/TicketDetails";
import ClubAdminDashboard from "./pages/clubAdmin/ClubAdminDashboard";
function AppRoutes() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboardpage" element={<AdminDashboard/>} />  {/* Ensure this route points to AdminDashboard */}
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/admin-club-dashboard" element={<ClubAdminDashboard/>} />
        {/* Admin Routes */}
        <Route path="/eventpage" element={<EventPage />} />
        <Route path="/clubpage" element={<ClubsPage/>} />
        {/* Club Admin Routes */}
        <Route path="/clubadmin/announcements-events" element={<AnnouncementsEvents />} />
        <Route path="/clubadmin/messages" element={<SendMessage />} />
        <Route path="/clubadmin/club-members" element={<ManageMembers />} />
        <Route path="/clubadmin/membership-requests" element={<MembershipRequests />} />
        <Route path="/clubadmin/Profile" element={<EditProfile />} />
        {/* Other Routes */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/clubs/:clubId" element={<ClubProfile />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/explore-events" element={<ExploreEvents />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/purchase/:id" element={<PurchaseTicket />} />
        <Route path="/ticket-success" element={<TicketSuccess />} />
        <Route path="ticket/:id" element={<TicketDetails />} />
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
