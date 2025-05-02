import Club from "../models/Club.js";

// Create new club
export const createClub = async (req, res) => {
  try {
    const { name, description, adminId, image } = req.body;

    if (!name || !adminId) {
      return res
        .status(400)
        .json({ message: "Name and Admin ID are required" });
    }

    const club = new Club({
      name,
      description,
      adminId,
      image,
    });

    const createdClub = await club.save();
    res.status(201).json(createdClub);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all clubs
export const getClubs = async (req, res) => {
  const clubs = await Club.find();
  res.json(clubs);
};

// Get a single club by ID
export const getClubById = async (req, res) => {
  const club = await Club.findById(req.params.id);

  if (club) {
    res.json(club);
  } else {
    res.status(404).json({ message: "Club not found" });
  }
};

// Update club info
export const updateClub = async (req, res) => {
  const { name, description, image } = req.body;

  const club = await Club.findById(req.params.id);

  if (club) {
    club.name = name || club.name;
    club.description = description || club.description;
    club.image = image || club.image;

    const updatedClub = await club.save();
    res.json(updatedClub);
  } else {
    res.status(404).json({ message: "Club not found" });
  }
};

// Delete a club
export const deleteClub = async (req, res) => {
  const club = await Club.findById(req.params.id);

  if (club) {
    await club.deleteOne();
    res.json({ message: "Club deleted successfully" });
  } else {
    res.status(404).json({ message: "Club not found" });
  }
};

export const getClubByName = async (req, res) => {
  const nameParam = req.params.clubName.toLowerCase().replace(/-/g, " ");

  try {
    const club = await Club.findOne({
      name: { $regex: new RegExp("^" + nameParam + "$", "i") },
    });

    if (!club) return res.status(404).json({ message: "Club not found" });

    res.json(club);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch club" });
  }
};
