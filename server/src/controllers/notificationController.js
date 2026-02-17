const Notification = require("../models/Notification");

/** Admin: create a notification for a specific user. */
exports.createForUser = async (req, res) => {
  try {
    const { userId, type, title, message, link } = req.body;
    if (!userId || !type || !title || !message) {
      return res.status(400).json({ message: "userId, type, title and message are required" });
    }
    const validTypes = ["upcoming", "rescheduled", "cancelled", "general"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "type must be one of: " + validTypes.join(", ") });
    }
    const notification = await Notification.create({
      user: userId,
      type,
      title,
      message,
      link: link || undefined,
    });
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create notification" });
  }
};

exports.getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get notifications" });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!notification) return res.status(404).json({ message: "Notification not found" });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update notification" });
  }
};
