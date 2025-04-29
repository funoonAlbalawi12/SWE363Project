import mongoose from 'mongoose';
const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },

  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true, 
  },
}, { timestamps: true });

const Club = mongoose.model('Club', clubSchema);

export default Club;
