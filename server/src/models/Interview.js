const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    mode: { type: String, enum: ["Online", "On-site"], default: "Online" },
    status: {
      type: String,
      enum: ["scheduled", "completed", "pending", "cancelled", "selected", "rejected"],
      default: "scheduled",
    },
    meetingLink: { type: String, trim: true },
    platform: { type: String, trim: true },
    interviewer: { type: String, trim: true },
    interviewerEmail: { type: String, trim: true },
    address: { type: String, trim: true },
    outcome: { type: String, trim: true },
    notes: { type: String, trim: true },
    feedback: { type: String, trim: true },
    feedbackVisibleToCandidate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Interview", interviewSchema);
