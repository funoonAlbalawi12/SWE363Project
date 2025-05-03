import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['member', 'admin'],
    default: 'member',
    required: true,
  },
  club: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Member = mongoose.model('Member', memberSchema);

export default Member;
