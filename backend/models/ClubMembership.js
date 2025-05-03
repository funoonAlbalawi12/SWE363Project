import mongoose from "mongoose";

const clubMembershipSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Club",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    role: {
      type: String, 
      default: "", 
    },
    fullName: String,
    email: String,
    phone: String,
    studentId: String,
    major: String,
    yearLevel: String,
    motivation: String,
    skills: String,
    availability: String,
  },
  { timestamps: true }
);

export default mongoose.model("ClubMembership", clubMembershipSchema);
