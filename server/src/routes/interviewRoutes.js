const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");
const { protect } = require("../middleware/authMiddleware");

router.get("/user/:userId", protect, interviewController.getUserInterviews);
router.get("/:id", protect, interviewController.getInterviewById);
router.post("/", protect, interviewController.createInterview);
router.put("/:id", protect, interviewController.updateInterview);

module.exports = router;
