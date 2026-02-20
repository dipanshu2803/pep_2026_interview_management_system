const Interview = require("../models/Interview");
const { generateGoogleMeetLink } = require("../utils/meetLink");

exports.getUserInterviews = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { status } = req.query;
    const filter = { user: userId };
    if (status) filter.status = status;
    const interviews = await Interview.find(filter).sort({ date: -1 }).lean();
    const isOwnList = req.user && String(req.user._id) === String(userId);
    const list = interviews.map((inv) => {
      const obj = { ...inv, id: inv._id };
      if (isOwnList && !inv.feedbackVisibleToCandidate) {
        obj.feedback = undefined;
      }
      return obj;
    });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get interviews" });
  }
};

exports.getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id).populate("user", "fullName email");
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get interview" });
  }
};

exports.createInterview = async (req, res) => {
  try {
    const payload = { ...req.body, user: req.body.userId };
    // When a candidate schedules, require admin approval; admin-created interviews stay scheduled
    if (req.user && req.user.role === "candidate") {
      payload.status = "pending_approval";
    }
    const mode = (payload.mode || "Online").toLowerCase();
    if (mode === "online" && !payload.meetingLink) {
      payload.meetingLink = generateGoogleMeetLink();
      if (!payload.platform) payload.platform = "Google Meet";
    }
    const interview = await Interview.create(payload);
    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create interview" });
  }
};

exports.updateInterview = async (req, res) => {
  try {
    const existing = await Interview.findById(req.params.id).lean();
    if (!existing) return res.status(404).json({ message: "Interview not found" });
    const update = { ...req.body };
    const willBeOnline = (update.mode !== undefined ? update.mode : existing.mode || "Online").toString().toLowerCase() === "online";
    if (willBeOnline && !existing.meetingLink && update.meetingLink === undefined) {
      update.meetingLink = generateGoogleMeetLink();
      if (update.platform === undefined) update.platform = "Google Meet";
    }
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true }
    );
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update interview" });
  }
};
