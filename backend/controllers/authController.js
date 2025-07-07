const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create default admin user if it doesn't exist
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      await User.create({
        name: "Admin",
        email: "admin@crm.com",
        password: "admin123",
        role: "admin"
      });
      console.log("✅ Default admin user created: admin@crm.com / admin123");
    }
  } catch (error) {
    console.error("❌ Error creating default admin:", error.message);
  }
};

// Call this function when the server starts
createDefaultAdmin();

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = await User.create({ name, email, password, role });
    res.json({ msg: "Registered successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    // res.json({ token, role: user.role });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, // set true if using HTTPS
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({ msg: "Logged in", role: user.role });
      
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ msg: "Logged out" });
};

module.exports = { register, login, logout };
