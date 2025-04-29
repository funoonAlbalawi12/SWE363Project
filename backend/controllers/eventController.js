
import Event from '../models/Event.js';
import Club from '../models/Club.js';

export const createEvent = async (req, res) => {
  const { title, description, location, date, price,club } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: 'Title and Date are required' });
  }
  try {
    // Check if club exists
    const clubExists = await Club.findById(club);
    if (!clubExists) {
      return res.status(404).json({ message: 'Club not found' });
    }

    // If user is clubadmin, check if the club belongs to him
    if (req.user.role === 'clubadmin' && clubExists.adminId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You can only create events for your own club' });
    }

  const event = await Event.create({
    title,
    description,
    location,
    date,
    price,
  });

  res.status(201).json(event);
} catch (error) { console.error(error);
  res.status(500).json({ message: 'Server error' });
}
};

// @desc    Get all events
export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

// @desc    Get single event by id
export const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
};

