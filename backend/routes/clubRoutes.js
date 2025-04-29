import express from "express";
import {
  createClub,
  getClubs,
  getClubById,
  updateClub,
  deleteClub,
} from "../controllers/clubController.js";
// import { protectRoute,adminRoute,  adminOrOwnClubRoute,} from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes (no auth needed)
router.get("/", getClubs);
router.get("/:id", getClubById);



router.post(
  "/",
  createClub
); 


router.put("/:id", updateClub); 
router.delete("/:id", deleteClub); 

export default router;
