const Initiative = require("../Model/initiativeModel");
const { User } = require("../Model/userModel");

// Create Initiative
exports.createInitiative = async (req, res) => {
  const { name, description, date, location, createdBy, _id } = req.body;
  try {
    const initiative = new Initiative({
      name,
      description,
      date,
      location,
      createdBy,
    });
    await initiative.save();

    const user = await User.findById(_id);
    user.createdInitiatives.push(initiative._id);
    await user.save();

    // res.status(201).json(initiative);
    res.status(201).send({
      success: true,
      message: "Initiative created successfully",
      initiative,
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

// Get All Initiatives
exports.getAllInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find()
      .populate("createdBy", "name")
      // .populate("participants", "name")
      .sort({ createdAt: -1 });
    // res.status(200).json(initiatives);
    res.status(200).send({
      success: true,
      message: "Initiatives fetched successfully",
      initiatives,
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

// Join Initiative
exports.joinInitiative = async (req, res) => {
  const initiativeId = req.params.id;
  try {
    const initiative = await Initiative.findById(initiativeId);
    if (!initiative)
      return res.status(404).send({
        success: false,
        message: "Initiative not found",
      });

    if (!initiative.participants.includes(req._id)) {
      initiative.participants.push(req._id);
      await initiative.save();

      const user = await User.findById(req._id);
      user.joinedInitiatives.push(initiativeId);
      await user.save();
    }

    // res.status(200).json(initiative);
    res.status(201).send({
      success: true,
      message: "Joined Initiative Successfully",
      initiative,
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

// Get Initiatives Created by User
exports.getUserCreatedInitiatives = async (req, res) => {
  try {
    const initiatives = await Initiative.find({ createdBy: req.user.userId });
    // res.status(200).json(initiatives);
    res.status(200).send({
      success: true,
      message: "Initiatives Fetched Successfully",
      initiatives,
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

// Get Initiatives Joined by User
exports.getUserJoinedInitiatives = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate(
      "joinedInitiatives"
    );
    // res.status(200).json(user.joinedInitiatives);
    res.status(200).send({
      success: true,
      message: "Joined Initiatives Fetched Successfully",
      initiatives: user.joinedInitiatives,
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
