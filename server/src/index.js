require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const PORT = process.env.PORT || 5000;

// Default admin credentials (can be overridden via environment variables)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@example.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin User";

const ensureDefaultAdmin = async () => {
  try {
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      if (existing.role !== "admin") {
        existing.role = "admin";
        await existing.save();
        console.log(`Updated existing user to admin: ${ADMIN_EMAIL}`);
      } else {
        console.log(`Admin already exists: ${ADMIN_EMAIL}`);
      }
      return;
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);
    await User.create({
      fullName: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
      role: "admin",
    });
    console.log(`Default admin created: ${ADMIN_EMAIL}`);
  } catch (err) {
    console.error("Failed to ensure default admin user:", err.message);
  }
};

connectDB()
  .then(async () => {
    await ensureDefaultAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
