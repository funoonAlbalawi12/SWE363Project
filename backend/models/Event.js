import mongoose from 'mongoose';
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  date: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    default: 0,
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club', // Connect event to a club

  },
  img: {
    type: String,
   
  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

export default Event;
