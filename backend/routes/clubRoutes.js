import express from "express";
import multer from "multer";

import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";
// import { protectRoute,adminRoute,  adminOrOwnClubRoute,} from "../middleware/authMiddleware.js";

const router = express.Router();

// Configure multer to handle file uploads
const upload = multer({ dest: "uploads/" }); // You can change this path

// Create a club with image upload
router.post("/", upload.single("image"), createClub);


// Public routes (no auth needed)
router.get("/", getClubs);
router.get("/:id", getClubById);



router.put("/:id", updateClub); 
router.delete("/:id", deleteClub); 

export default router;
