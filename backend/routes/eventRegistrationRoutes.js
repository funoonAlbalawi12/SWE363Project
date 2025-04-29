import express from 'express';
import { registerForEvent, updateRegistrationStatus, getEventRegistrations } from '../controllers/eventRegistrationController.js';
//import { protectRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerForEvent);
router.put('/:id', updateRegistrationStatus);
router.get('/', getEventRegistrations);

export default router;
