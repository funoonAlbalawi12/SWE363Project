import mongoose from 'mongoose';
const clubMembershipSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  clubId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Club',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
}, { timestamps: true });

const ClubMembership = mongoose.model('ClubMembership', clubMembershipSchema);
export default ClubMembership;
