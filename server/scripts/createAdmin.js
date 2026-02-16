/**
 * Create an admin user in the database.
 * Usage: node scripts/createAdmin.js
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in .env, or they default to admin@example.com / admin123
 */
require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/User");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pep_interview_db";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

async function run() {
  await mongoose.connect(MONGODB_URI);
  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    if (existing.role === "admin") {
      console.log("Admin already exists:", ADMIN_EMAIL);
    } else {
      existing.role = "admin";
      await existing.save();
      console.log("Updated user to admin:", ADMIN_EMAIL);
    }
  } else {
    const hashed = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashed,
      role: "admin",
    });
    console.log("Admin created:", ADMIN_EMAIL);
  }
  await mongoose.disconnect();
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
