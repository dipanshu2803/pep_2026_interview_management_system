const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/:id", protect, userController.getProfile);
router.put("/:id", protect, userController.updateProfile);

module.exports = router;
