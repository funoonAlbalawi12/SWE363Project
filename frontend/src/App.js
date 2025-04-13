import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/student/LandingPage/LandingPage";
import Login from "./pages/student/Login/Login";
import Signup from "./pages/student/Signup/Signup";
import Dashboard from "./pages/student/Dashboard/Dashboard";
import { useLocation } from "react-router-dom";
import Settings from "./pages/student/Settings/Settings";
import Profile from "./pages/student/Profile/Profile";
import ExploreClubs from "./pages/student/ExploreClubs/ExploreClubs";
import Home from "./pages/student/Home/Home";
import ClubProfile from "./pages/student/ClubProfile/ClubProfile";
import EventPage from "./pages/admin/eventpage/eventpage";

function AppRoutes() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/explore-clubs" element={<ExploreClubs />} />
        <Route path="/clubs/:clubId" element={<ClubProfile />} />
        <Route path="/eventpage" element={<EventPage />} />

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
