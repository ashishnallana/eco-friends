const express = require("express");
const router = express.Router();
const ecoActionController = require("../Controller/ecoActionController");
const authMiddleware = require("../middleware/authMiddleware");

// Log a new eco-friendly action
router.post("/", authMiddleware, ecoActionController.logEcoAction);

// Get all eco-friendly actions logged by the user
router.get("/:id", ecoActionController.getUserEcoActions);

// Get user's environmental impact dashboard
router.get("/impact/:id", ecoActionController.getUserImpactDashboard);

module.exports = router;
