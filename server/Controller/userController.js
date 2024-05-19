const { User } = require("../Model/userModel");
const { comparePassword, hashPassword } = require("./../helpers/authHelper.js");

// register
module.exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    const existingUser = await User.findOne({
      email,
    });
    const existingUsername = await User.findOne({
      username,
    });

    if (existingUser)
      return res.send({ success: false, message: "User already exists" });

    if (existingUsername)
      return res.send({ success: false, message: "username already exists" });

    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      username,
      email,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// login
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = user.generateJWT();
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        photo: user.photo,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// get profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    // res.status(200).json(user);
    res.status(201).send({
      success: true,
      message: "User fetched",
      user,
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

// Update User Profile
exports.updateProfile = async (req, res) => {
  // const { name, username, photo } = req.body;
  const { name, username, photo, interests, _id } = req.body;
  try {
    // const updatedData = { name, username, photo };
    const updatedData = { name, username, photo, interests };
    const user = await User.findByIdAndUpdate(
      // req.body.user._id,
      _id,
      { $set: updatedData }
      // { new: true, runValidators: true }
    );

    if (!user)
      return res.status(404).send({
        success: false,
        message: "User not found",
      });

    // res.status(200).json(user);
    res.status(201).send({
      success: true,
      message: "User Updated Successfully",
      user,
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

// module.exports.getNeighbours = async (req, res) => {
//   try {
//     const location = req.params.location;
//     let users = await User.find({ location }).limit(10);
//     users = users.map((user) => ({
//       _id: user._id,
//       name: user.name,
//       image: user.image,
//     }));
//     res.send({
//       success: true,
//       users,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send({ success: false, message: "Request failed" });
//   }
// };
