const express = require("express");
const router = express.Router();
const initiativeController = require("../Controller/initiativeController");
const authMiddleware = require("../middleware/authMiddleware");

// Create Initiative
router.post("/new", authMiddleware, initiativeController.createInitiative);

// Get All Initiatives
router.get("/", initiativeController.getAllInitiatives);

// Join Initiative
router.post("/:id/join", authMiddleware, initiativeController.joinInitiative);

// Get Initiatives Created by User
router.get(
  "/created",
  authMiddleware,
  initiativeController.getUserCreatedInitiatives
);

// Get Initiatives Joined by User
router.get(
  "/joined",
  authMiddleware,
  initiativeController.getUserJoinedInitiatives
);

module.exports = router;
