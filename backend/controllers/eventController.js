import Event from "../models/Event.js";
import Club from "../models/Club.js";

export const createEvent = async (req, res) => {
  const { title, description, location, date, price, club } = req.body;

  if (!title || !date) {
    return res.status(400).json({ message: "Title and Date are required" });
  }

  try {
    const clubExists = await Club.findById(club);
    if (!clubExists) {
      return res.status(404).json({ message: "Club not found" });
    }

    if (
      req.user.role === "clubadmin" &&
      clubExists.adminId.toString() !== req.user._id.toString()
    ) {
      return res
        .status(403)
        .json({ message: "You can only create events for your own club" });
    }

    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const event = await Event.create({
      title,
      description,
      location,
      date,
      price,
      club,
      img: imagePath,
    });

    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Server error" });
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
    res.status(404).json({ message: "Event not found" });
  }
};

const sanitizeTitle = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

export const getEventByTitle = async (req, res) => {
  try {
    const safeParam = sanitizeTitle(req.params.title);

    const allEvents = await Event.find();
    const matched = allEvents.find((e) => sanitizeTitle(e.title) === safeParam);

    if (!matched) return res.status(404).json({ message: "Event not found" });

    res.json(matched);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
