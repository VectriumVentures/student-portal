const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { protect, authorize, updateLastLogin } = require("../middleware/authMiddleware");
const User = require("../models/User");
const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", protect, logout);

// Get current user profile
router.get("/me", protect, updateLastLogin, async (req, res) => {
  try {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      phone: req.user.phone,
      organization: req.user.organization,
      studentId: req.user.studentId,
      isActive: req.user.isActive,
      lastLogin: req.user.lastLogin,
      createdAt: req.user.createdAt
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update user profile
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, phone, organization, studentId } = req.body;
    const user = req.user;

    // Update allowed fields
    if (name) user.name = name.trim();
    if (phone) user.phone = phone.trim();

    // Role-specific updates
    if (user.role === "counsellor" && organization) {
      user.organization = organization.trim();
    }
    if (user.role === "student" && studentId) {
      user.studentId = studentId.trim();
    }

    await user.save();

    res.json({
      msg: "Profile updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        organization: user.organization,
        studentId: user.studentId
      }
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Admin only routes
router.get("/users", protect, authorize("admin"), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Verify token endpoint (for frontend route protection)
router.get("/verify", protect, (req, res) => {
  res.json({
    valid: true,
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
});

module.exports = router;
