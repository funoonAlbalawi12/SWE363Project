import express from 'express';
import { getMyClub, getRecentMembers, getClubEvents } from '../controllers/clubController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get the current club admin's club info
router.get('/my-club', protectRoute, getMyClub);

// Get recent members of the club
router.get('/recent-members', protectRoute, getRecentMembers);

// Get events related to this club
router.get('/my-events', protectRoute, getClubEvents);

// Test route
router.get('/test', (req, res) => {
  res.json({ message: "✅ clubadmin route is working" });
});

export default router;
