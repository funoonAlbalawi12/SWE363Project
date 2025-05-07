import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  const { userId, eventId, attendees } = req.body;

  if (!userId || !eventId || !attendees || attendees.length === 0) {
    return res.status(400).json({ message: "Missing fields in request" });
  }

  try {
    const existingTickets = await Ticket.find({ userId, eventId });

    const existingEmails = new Set();
    for (const ticket of existingTickets) {
      ticket.attendees.forEach((a) => existingEmails.add(a.email));
    }

    const duplicateEmails = attendees.filter((a) =>
      existingEmails.has(a.email)
    );
    if (duplicateEmails.length > 0) {
      return res.status(409).json({
        message: `Some attendees are already registered: ${duplicateEmails
          .map((d) => d.email)
          .join(", ")}`,
      });
    }

    const newTicket = await Ticket.create({
      userId,
      eventId,
      attendees,
    });

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// controllers/ticketController.js
export const getTickets = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const tickets = await Ticket.find({ userId }).populate("eventId");
    res.status(200).json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

export const checkIfRegistered = async (req, res) => {
  const { eventId, email } = req.query;

  if (!eventId || !email) {
    return res.status(400).json({ message: "Event ID and email are required" });
  }

  try {
    const ticket = await Ticket.findOne({
      eventId,
      "attendees.email": email.toLowerCase().trim(),
    });

    res.json({ alreadyRegistered: !!ticket });
  } catch (err) {
    console.error("Error checking ticket:", err);
    res.status(500).json({ message: "Server error" });
  }
};
