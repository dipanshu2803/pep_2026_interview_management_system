const Interview = require("../models/Interview");

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
    const interview = await Interview.create({ ...req.body, user: req.body.userId });
    res.status(201).json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to create interview" });
  }
};

exports.updateInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!interview) return res.status(404).json({ message: "Interview not found" });
    res.json(interview);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to update interview" });
  }
};
