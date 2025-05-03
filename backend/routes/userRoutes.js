import express from "express";
import { registerUser, loginUser , getUserById, updateUser} from "../controllers/userController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);

export default router;
