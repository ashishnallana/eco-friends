const Challenge = require("../Model/challengeModel");
const Reward = require("../Model/rewardModel");
const { User } = require("../Model/userModel");

exports.createChallenge = async (req, res) => {
  try {
    const { title, description, points } = req.body;
    const challenge = new Challenge({ title, description, points });
    await challenge.save();
    // res.status(201).json({ message: 'Challenge created successfully', challenge });
    res.status(201).send({
      success: true,
      message: "Challenge created successfully",
      challenge,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

exports.getChallenges = async (req, res) => {
  try {
    const { userId } = req.params;
    const challenges = await Challenge.find({
      completedBy: { $ne: userId },
    }).sort({ createdAt: -1 });
    // res.status(200).json(challenges);
    res.status(200).send({
      success: true,
      message: "Challenges fetched successfully",
      challenges,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

exports.completeChallenge = async (req, res) => {
  try {
    const { userId, challengeId, proof, message } = req.body;
    // console.log({ userId, challengeId, proof, message });
    const challenge = await Challenge.findById(challengeId);
    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    if (challenge.completedBy.includes(userId)) {
      return res.status(400).json({ message: "Challenge already completed" });
    }

    challenge.completedBy.push(userId);
    challenge.count += 1;
    await challenge.save();

    const reward = new Reward({
      userId,
      challengeId,
      proof,
      experience: message,
    });
    await reward.save();

    const user = await User.findById(userId);
    user.points += challenge.points;
    await user.save();

    // res.status(200).json({ message: "Challenge completed", reward });
    res.status(200).send({
      success: true,
      message: "Challenge completed succesfully",
      reward,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

exports.getUserRewards = async (req, res) => {
  try {
    const { userId } = req.params;
    const rewards = await Reward.find({ userId }).populate("challengeId");
    // res.status(200).json(rewards);
    res.status(200).send({
      success: true,
      message: "User rewards fetched succesfully",
      rewards,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};
