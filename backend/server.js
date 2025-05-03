import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import Stripe from "stripe";
import path from 'path'; // Import path module

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import clubMembershipRoutes from './routes/clubMembershipRoutes.js';
import eventRegistrationRoutes from './routes/eventRegistrationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import clubAdminApiRoutes from './routes/clubAdminApiRoutes.js';

dotenv.config();
connectDB();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(cors());
app.use(express.json());

// 🔍 Test direct route to verify backend
app.get('/api/test-direct', (req, res) => {
  res.status(200).json({ message: '✅ Direct backend route working' });
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/clubs', clubRoutes);
app.use('/api/clubmemberships', clubMembershipRoutes);
app.use('/api/eventregistrations', eventRegistrationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/clubadmin', clubAdminApiRoutes);

// Serve static files from "uploads" folder for image file serving
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
