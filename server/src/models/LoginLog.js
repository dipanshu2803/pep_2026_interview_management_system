const mongoose = require("mongoose");

const loginLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    email: { type: String, required: true, lowercase: true, trim: true },
    role: { type: String, enum: ["candidate", "interviewer", "admin"], trim: true },
    success: { type: Boolean, required: true },
    loginAt: { type: Date, default: Date.now },
    userAgent: { type: String, trim: true },
  },
  { timestamps: true }
);

loginLogSchema.index({ loginAt: -1 });
loginLogSchema.index({ user: 1, loginAt: -1 });

module.exports = mongoose.model("LoginLog", loginLogSchema);
