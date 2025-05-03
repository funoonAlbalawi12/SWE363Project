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

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/", upload.single("image"), createClub);
router.get("/", getClubs);
router.get("/:id", getClubById);
router.get("/name/:clubName", getClubByName);
router.put("/:id", updateClub);
router.delete("/:id", deleteClub);

export default router;
