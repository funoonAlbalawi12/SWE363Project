import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club', // Connect event to a club

  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
