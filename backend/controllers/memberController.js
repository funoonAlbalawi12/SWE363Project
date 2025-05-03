import Member from '../models/Member.js';

// GET all members from a specific club
export const getMembers = async (req, res) => {
  const club = req.query.club;
  try {
    const members = await Member.find({ club });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
};

// UPDATE a member's role
export const updateMemberRole = async (req, res) => {
  const memberId = req.params.id;
  const { role } = req.body;
  try {
    const updated = await Member.findByIdAndUpdate(
      memberId,
      { role },
      { new: true }
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update member role' });
  }
};

// DELETE a member
export const deleteMember = async (req, res) => {
  const memberId = req.params.id;
  try {
    await Member.findByIdAndDelete(memberId);
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete member' });
  }
};
