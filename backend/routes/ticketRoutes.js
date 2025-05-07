import express from "express";
import {
  createTicket,
  getTickets,
  checkIfRegistered,
} from "../controllers/ticketController.js";
const router = express.Router();

router.post("/", createTicket);
router.get("/", getTickets);
router.get("/check", checkIfRegistered);

export default router;
