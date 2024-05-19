const { Router } = require("express");
const {
  register,
  // getNeighbours,
  login,
  getProfile,
  updateProfile,
} = require("../Controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = Router();

router.post("/register", register); // Sign Up Route
router.post("/login", login); //Sign In Route
// router.get("/neighbours/:location", getNeighbours); // Get Neighbour's Details Route
router.get("/profile/:id", authMiddleware, getProfile); // fetching profile
router.put("/profile", authMiddleware, updateProfile); // updating profile

router.get("/user-auth", authMiddleware, (req, res) => {
  res.status(200).send({
    ok: true,
    success: true,
    message: "You are Authorized",
  });
});

module.exports = router;
