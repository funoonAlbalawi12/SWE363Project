import express from 'express';
import {
  getMembers,
  updateMemberRole,
  deleteMember,
} from '../controllers/memberController.js';

const router = express.Router();

// Route to get all members of a specific club
router.get('/', getMembers);

// Route to update a member's role
router.put('/:id', updateMemberRole);

// Route to delete a member
router.delete('/:id', deleteMember);

export default router;
