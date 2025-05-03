import express from 'express';
import { upload } from '../middleware/upload.js';

import { createEvent, getEvents, getEventById, getEventByTitle } from '../controllers/eventController.js';
// import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/', upload.single("img"), createEvent);

router.get('/', getEvents);
router.get('/:id', getEventById);
router.get('/title/:title', getEventByTitle);


export default router;
