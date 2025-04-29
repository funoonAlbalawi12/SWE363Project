import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Club from "../models/Club.js"; 

export const protectRoute = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = {
        id: decoded.id,
        role: decoded.role,
      };

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
export const adminRoute = (req, res, next) => {
    if(req.user && req.user.role === "admin") {
        next();
    } else{
        return res.status(403).json({message: "Admin access only"});
    }
};

export const clubadminRoute = (req, res, next) => {
    if(req.user && req.user.role === "clubadmin") {
        next();
    } else{
        return res.status(403).json({message: "Club Admin access only"});
    }
};




// Allow Admin to update any club
// Allow ClubAdmin to update only his own club
export const adminOrOwnClubRoute = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role === 'admin') {
            return next();
    }

    if (req.user.role === 'clubadmin') {
      const clubId = req.params.id; 
      const club = await Club.findById(clubId);

      if (!club) {
        return res.status(404).json({ message: 'Club not found' });
      }

      if (club.adminId.toString() === req.user.id.toString()) {
        return next();
      } else {
        return res.status(403).json({ message: 'Access forbidden: You can only update your own club' });
      }
    }

    return res.status(403).json({ message: 'Access forbidden' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


