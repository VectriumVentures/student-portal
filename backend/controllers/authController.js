const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, role = "student", phone, organization, studentId } = req.body;

  try {
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Name, email, and password are required" });
    }

    if (!phone) {
      return res.status(400).json({ msg: "Phone number is required" });
    }

    // Role-specific validation
    if (role === "counsellor" && !organization) {
      return res.status(400).json({ msg: "Organization is required for counsellors" });
    }

    if (role === "student" && !studentId) {
      return res.status(400).json({ msg: "Student ID is required for students" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ msg: "User with this email already exists" });
    }

    // Create user data object
    const userData = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
      phone: phone.trim(),
    };

    // Add role-specific fields
    if (role === "counsellor") {
      userData.organization = organization.trim();
    }
    if (role === "student") {
      userData.studentId = studentId.trim();
    }

    // Create and save user
    const user = await User.create(userData);

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // Set cookie and respond
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .json({
        msg: "User registered successfully",
        role: user.role,
        name: user.name,
        email: user.email,
        id: user._id
      });

  } catch (err) {
    console.error("Registration error:", err);
    if (err.code === 11000) {
      // Duplicate key error
      const field = Object.keys(err.keyPattern)[0];
      return res.status(400).json({ msg: `${field} already exists` });
    }
    res.status(500).json({ msg: "Server error during registration" });
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
