<<<<<<< HEAD
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

=======
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
>>>>>>> 30946667a595f5aa1e081e2567a149a69f3ffcba

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import clubMembershipRoutes from "./routes/clubMembershipRoutes.js";
import eventRegistrationRoutes from "./routes/eventRegistrationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Get the directory name from the current file URL
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/api/users/test', (req, res) => {
  res.status(200).json({ message: 'Test successful!' });
=======
app.get("/api/users/test", (req, res) => {
  res.status(200).json({ message: "Test successful!" });
>>>>>>> 30946667a595f5aa1e081e2567a149a69f3ffcba
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/clubmemberships", clubMembershipRoutes);
app.use("/api/eventregistrations", eventRegistrationRoutes);
app.use("/api/payments", paymentRoutes);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
