const express = require("express");
const router = express.Router();
const challengeController = require("../Controller/challengeController");

router.post("/create", challengeController.createChallenge);
router.get("/:userId", challengeController.getChallenges);
router.post("/complete", challengeController.completeChallenge);
router.get("/rewards/:userId", challengeController.getUserRewards);

module.exports = router;
