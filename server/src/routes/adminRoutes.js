const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const notificationController = require("../controllers/notificationController");
const { protect, requireRole } = require("../middleware/authMiddleware");

router.use(protect);
router.use(requireRole("admin"));

router.post("/notifications", notificationController.createForUser);
router.get("/interviews", adminController.getAllInterviews);
router.get("/users", adminController.getAllUsers);
router.patch("/users/:id/block", adminController.blockUser);
router.delete("/users/:id", adminController.deleteUser);

module.exports = router;
