const mongoose = require("mongoose");

const rewardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Challenge",
    required: true,
  },
  earnedAt: {
    type: Date,
    default: Date.now,
  },
  proof: {
    type: String,
  },
  experience: {
    type: String,
  },
});

module.exports = mongoose.model("Reward", rewardSchema);
