const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const LoginLog = require("../models/LoginLog");

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-change-in-production";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";
const ADMIN_SIGNUP_SECRET = process.env.ADMIN_SIGNUP_SECRET;

const signToken = (id, role) =>
  jwt.sign({ id, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

const logLogin = async (data) => {
  try {
    await LoginLog.create(data);
  } catch (e) {
    console.error("LoginLog create error:", e.message);
  }
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, role = "candidate", adminSecret } = req.body;
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Full name, email and password are required" });
    }
    let userRole = "candidate";
    if (role === "admin") {
      // If ADMIN_SIGNUP_SECRET is configured, require it. Otherwise (e.g. local/dev), allow admin creation without a secret.
      if (ADMIN_SIGNUP_SECRET && adminSecret !== ADMIN_SIGNUP_SECRET) {
        return res.status(403).json({ message: "Admin signup requires a valid secret" });
      }
      userRole = "admin";
    } else if (["candidate", "interviewer"].includes(role)) {
      userRole = role;
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: userRole,
    });
    const token = signToken(user._id, user.role);
    res.status(201).json({
      message: "User created",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Signup failed" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userAgent = req.get("user-agent") || "";
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      await logLogin({ email, success: false, loginAt: new Date(), userAgent });
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      await logLogin({ email, success: false, loginAt: new Date(), userAgent });
      return res.status(401).json({ message: "Invalid email or password" });
    }
    await logLogin({
      user: user._id,
      email: user.email,
      role: user.role,
      success: true,
      loginAt: new Date(),
      userAgent,
    });
    const token = signToken(user._id, user.role);
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Login failed" });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "If that email exists, a reset link has been sent" });
    }
    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save({ validateBeforeSave: false });
    // In production: send email with link containing token. For now return token for testing.
    const resetUrl = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password?token=${token}`;
    res.json({
      message: "If that email exists, a reset link has been sent",
      resetUrl, // Remove in production when email is implemented
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Forgot password failed" });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -resetPasswordToken -resetPasswordExpires");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message || "Failed to get user" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and new password are required" });
    }
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset link" });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
    const jwtToken = signToken(user._id, user.role);
    res.json({
      message: "Password reset successful",
      token: jwtToken,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message || "Reset password failed" });
  }
};
