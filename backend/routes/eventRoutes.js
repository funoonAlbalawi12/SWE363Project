import express from 'express';

import { createEvent, getEvents, getEventById } from '../controllers/eventController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protectRoute, createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);

export default router;
