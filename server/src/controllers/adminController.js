const Interview = require("../models/Interview");
const User = require("../models/User");

exports.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate("user", "fullName email role")
      .sort({ date: -1 });
    res.json(interviews);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get interviews" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const filter = {};
    if (role && ["candidate", "interviewer", "admin"].includes(role)) filter.role = role;
    const users = await User.find(filter)
      .select("-password -resetPasswordToken -resetPasswordExpires")
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get users" });
  }
};

exports.blockUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { blocked } = req.body;
    if (req.user.id === id) {
      return res.status(400).json({ message: "Cannot block yourself" });
    }
    const user = await User.findByIdAndUpdate(
      id,
      { isBlocked: !!blocked },
      { new: true }
    ).select("-password -resetPasswordToken -resetPasswordExpires");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.id === id) {
      return res.status(400).json({ message: "Cannot delete yourself" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to delete user" });
  }
};
