import EventRegistration from '../models/EventRegistration.js';
import Event from '../models/Event.js';

// Student registers for an event
export const registerForEvent = async (req, res) => {
  const { userId, eventId } = req.body;

  if (!userId || !eventId) {
    return res.status(400).json({ message: 'User ID and Event ID are required' });
  }
  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const alreadyRegistered = await EventRegistration.findOne({ user: req.user._id, event: eventId });
    if (alreadyRegistered) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

  const registration = await EventRegistration.create({
    userId,
    eventId,
    status: 'pending',
  });

  res.status(201).json(registration);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Server error' });
}
};

// Club Admin accepts or rejects
export const updateRegistrationStatus = async (req, res) => {
  const { status } = req.body;

  const registration = await EventRegistration.findById(req.params.id);

  if (registration) {
    registration.status = status;
    const updatedRegistration = await registration.save();
    res.json(updatedRegistration);
  } else {
    res.status(404).json({ message: 'Event registration not found' });
  }
};

// Get all registrations for an event
export const getEventRegistrations = async (req, res) => {
  const { eventId } = req.query;

  if (!eventId) {
    return res.status(400).json({ message: 'Event ID is required' });
  }

  const registrations = await EventRegistration.find({ eventId }).populate('userId');

  res.json(registrations);
};

