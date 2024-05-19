const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ecoActionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    impactScore: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EcoAction = mongoose.model("EcoAction", ecoActionSchema);

module.exports = EcoAction;
