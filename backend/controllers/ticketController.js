
import Ticket from '../models/Ticket.js';
// Register (buy) a ticket
export const createTicket = async (req, res) => {
  const { userId, eventId, attendeeName, attendeeEmail } = req.body;

  if (!userId || !eventId || !attendeeName || !attendeeEmail) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const ticket = await Ticket.create({
    userId,
    eventId,
    attendeeName,
    attendeeEmail,
  });

  res.status(201).json(ticket);
};

// Get my tickets
export const getTickets = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const tickets = await Ticket.find({ userId }).populate('eventId');

  res.json(tickets);
};

