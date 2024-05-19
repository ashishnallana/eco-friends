const EcoAction = require("../Model/ecoActionModel");
const { User } = require("../Model/userModel");

// Log a new eco-friendly action
exports.logEcoAction = async (req, res) => {
  const { actionType, description, impactScore } = req.body;

  try {
    const ecoAction = new EcoAction({
      user: req._id,
      actionType,
      description,
      impactScore,
    });
    await ecoAction.save();

    const user = await User.findById(req._id);
    user.ecoActions.push(ecoAction._id);
    await user.save();

    // res.status(201).json(ecoAction);
    res.status(201).send({
      success: true,
      message: "Eco Action Logged Successfully",
      ecoAction,
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

// Get all eco-friendly actions logged by the user
exports.getUserEcoActions = async (req, res) => {
  const { id } = req.params;
  try {
    const ecoActions = await EcoAction.find({ user: id });
    // res.status(200).json(ecoActions);
    res.status(200).send({
      success: true,
      message: "User's Eco Actions fetched Successfully",
      ecoActions,
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

// Get user's environmental impact dashboard
exports.getUserImpactDashboard = async (req, res) => {
  const { id } = req.params;
  try {
    const ecoActions = await EcoAction.find({ user: id });
    const totalImpact = ecoActions.reduce(
      (sum, action) => sum + action.impactScore,
      0
    );

    // res.status(200).json({
    //   ecoActions,
    //   totalImpact,
    // });
    res.status(200).send({
      success: true,
      message: "user's environmental impact dashboard fetched successfully",
      ecoActions,
      totalImpact,
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
