import express from 'express';
import { requestMembership, updateMembershipStatus, getMemberships, getMembershipByUser } from '../controllers/clubMembershipController.js';

const router = express.Router();

router.post('/', requestMembership);
router.put('/:id', updateMembershipStatus);
router.get('/', getMemberships);
router.get('/user', getMembershipByUser);
export default router; 
