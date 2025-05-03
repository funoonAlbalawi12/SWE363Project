import ClubMembership from '../models/ClubMembership.js';
// Student requests to join club
export const requestMembership = async (req, res) => {
  const { userId, clubId } = req.body;

  if (!userId || !clubId) {
    return res.status(400).json({ message: 'User ID and Club ID are required' });
  }

  const membership = await ClubMembership.create({
    userId,
    clubId,
    status: 'pending',
  });

  res.status(201).json(membership);
};

// Club Admin accepts or rejects membership
export const updateMembershipStatus = async (req, res) => {
  const { status } = req.body; // accepted or rejected

  const membership = await ClubMembership.findById(req.params.id);

  if (membership) {
    membership.status = status;
    const updatedMembership = await membership.save();
    res.json(updatedMembership);
  } else {
    res.status(404).json({ message: 'Membership request not found' });
  }
};

// Get all membership requests for a club
export const getMemberships = async (req, res) => {
  const { clubId } = req.query;

  if (!clubId) {
    return res.status(400).json({ message: 'Club ID is required' });
  }

  const memberships = await ClubMembership.find({ clubId }).populate('userId');

  res.json(memberships);
};


export const getMembershipByUser = async (req, res) => {
  const { clubId, userId } = req.query;

  if (!clubId && !userId) {
    return res.status(400).json({ message: 'Club ID or User ID is required' });
  }

  const filter = {};
  if (clubId) filter.clubId = clubId;
  if (userId) filter.userId = userId;

  const memberships = await ClubMembership.find(filter).populate('clubId');
  res.json(memberships);
};
