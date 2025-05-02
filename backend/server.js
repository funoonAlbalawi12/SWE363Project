import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";
import clubRoutes from "./routes/clubRoutes.js";
import clubMembershipRoutes from "./routes/clubMembershipRoutes.js";
import eventRegistrationRoutes from "./routes/eventRegistrationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import joinRequestRoutes from "./routes/joinRequestRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/users/test", (req, res) => {
  res.status(200).json({ message: "Test successful!" });
});

app.use("/api/users", userRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/clubmemberships", clubMembershipRoutes);
app.use("/api/eventregistrations", eventRegistrationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/join-requests", joinRequestRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


