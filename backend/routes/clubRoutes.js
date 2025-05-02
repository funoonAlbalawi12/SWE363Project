import express from "express";
import multer from "multer";

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

// Configure multer to handle file uploads
const upload = multer({ dest: "uploads/" }); // You can change this path

// Create a club with image upload
router.post("/", upload.single("image"), createClub);

// Public routes (no auth needed)
router.get("/", getClubs);
router.get("/:id", getClubById);
router.get("/name/:clubName", getClubByName);

// Protected routes (admin OR clubadmin can update, but only admin can delete/create)

router.put("/:id", updateClub);
router.delete("/:id", deleteClub);
router.post(
  "/", // handle file upload
  createClub
); // Only Admin can create club

export default router;
