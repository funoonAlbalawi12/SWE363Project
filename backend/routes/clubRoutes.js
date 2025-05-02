import express from "express";
import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
  getClubByName,
} from "../controllers/clubController.js";
// import { protectRoute,adminRoute, adminOrOwnClubRoute,} from "../middleware/authMiddleware.js";


const router = express.Router();

// Public routes (no auth needed)
router.get("/", getClubs);
router.get("/:id", getClubById);
router.get("/name/:clubName", getClubByName);

// Protected routes (admin OR clubadmin can update, but only admin can delete/create)

router.post(
  "/", // handle file upload
  createClub
); // Only Admin can create club

router.put("/:id", updateClub); // Admin and ClubAdmin can update
router.delete("/:id", deleteClub); // Only Admin can delete

export default router;
