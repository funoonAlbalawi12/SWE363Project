import mongoose from "mongoose";
const clubSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    overview: String,
    vision: String,
    mission: String,
    image: {
      type: String,
    },

    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    events: [
      {
        title: String,
        subtitle: String,
        price: String,
        date: String,
        location: String,
        img: String,
      },
    ],
    socialLinks: [
      {
        name: String,
        icon: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

const Club = mongoose.model("Club", clubSchema);

export default Club;
