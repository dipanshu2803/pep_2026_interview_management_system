const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, trim: true },
    linkedIn: { type: String, trim: true },
    currentRole: { type: String, trim: true },
    experience: { type: String, trim: true },
    preferredLocation: { type: String, trim: true },
    bio: { type: String, trim: true },
    skills: [{ type: String, trim: true }],
    resumeUrl: { type: String, trim: true },
    role: { type: String, enum: ["candidate", "interviewer", "admin"], default: "candidate" },
    isBlocked: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    notificationPrefs: {
      emailUpcoming: { type: Boolean, default: true },
      emailRescheduled: { type: Boolean, default: true },
      emailCancelled: { type: Boolean, default: true },
      inAppUpcoming: { type: Boolean, default: true },
      inAppRescheduled: { type: Boolean, default: true },
      inAppCancelled: { type: Boolean, default: true },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
