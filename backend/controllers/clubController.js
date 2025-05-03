import Club from '../models/Club.js';
import ClubMembership from '../models/ClubMembership.js';
import Event from '../models/Event.js';

// Create new club
export const createClub = async (req, res) => {
  try {
    const { name, description, adminId } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";  // Get the image file path

    if (!name || !adminId) {
      return res.status(400).json({ message: "Name and Admin ID are required" });
    }

    // Create the new club
    const club = new Club({ name, description, adminId, image });
    const createdClub = await club.save();

    res.status(201).json(createdClub);
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all clubs
export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.json(clubs);
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single club by ID
export const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    console.error("Error fetching club by ID:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update club info
export const updateClub = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const club = await Club.findById(req.params.id);

    if (club) {
      club.name = name || club.name;
      club.description = description || club.description;
      club.image = image || club.image;

      const updatedClub = await club.save();
      res.json(updatedClub);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    console.error("Error updating club:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a club
export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      await club.deleteOne();
      res.json({ message: 'Club deleted successfully' });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    console.error("Error deleting club:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current club admin's club
export const getMyClub = async (req, res) => {
  try {
    const userId = req.user.id;
    const club = await Club.findOne({ adminId: userId });

    if (!club) {
      return res.status(404).json({ message: 'Club not found for this admin' });
    }

    res.json(club);
  } catch (error) {
    console.error("Error fetching club for admin:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get recent club members
export const getRecentMembers = async (req, res) => {
  try {
    const userId = req.user.id;
    const club = await Club.findOne({ adminId: userId });

    if (!club) return res.status(404).json({ message: 'Club not found' });

    const memberships = await ClubMembership.find({ clubId: club._id })
      .sort({ joinedAt: -1 })
      .limit(5)
      .populate('userId', 'fullName email');

    res.json(memberships);
  } catch (error) {
    console.error("Error fetching recent members:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get events for this admin's club
export const getClubEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const club = await Club.findOne({ adminId: userId });

    if (!club) return res.status(404).json({ message: 'Club not found' });

    const events = await Event.find({ clubId: club._id }).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching club events:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add this to your clubController.js
export const getClubByName = async (req, res) => {
  try {
    const { name } = req.params; // Assuming the name is passed as a URL parameter
    const club = await Club.findOne({ name });

    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    console.error("Error fetching club by name:", error);
    res.status(500).json({ message: 'Server error' });
  }
};

