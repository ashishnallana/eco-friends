const { Schema, model } = require("mongoose");
// const { Post } = require("./postModel");
const jwt = require("jsonwebtoken");
require("dotenv/config");

const userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    interests: {
      type: [String],
    },
    createdInitiatives: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
      },
    ],
    joinedInitiatives: [
      {
        type: Schema.Types.ObjectId,
        ref: "Initiative",
      },
    ],
    ecoActions: [
      {
        type: Schema.Types.ObjectId,
        ref: "EcoAction",
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
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

userSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  return token;
};

module.exports.User = model("User", userSchema);
