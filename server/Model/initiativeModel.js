const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const initiativeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://www.verizon.com/about/sites/default/files/2021-04/trees-planting-1230x690.jpg",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Initiative = mongoose.model("Initiative", initiativeSchema);

module.exports = Initiative;
