const express = require("express");
const router = express.Router();
const resourceController = require("../Controller/resourceController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, resourceController.createResource);
router.get("/", resourceController.getResources);
router.get("/:id", resourceController.getResourceById);

module.exports = router;
