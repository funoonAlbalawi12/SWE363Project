import express from 'express';
import { requestMembership, updateMembershipStatus, getMemberships } from '../controllers/clubMembershipController.js';

const router = express.Router();

router.post('/', requestMembership);
router.put('/:id', updateMembershipStatus);
router.get('/', getMemberships);

export default router; 
