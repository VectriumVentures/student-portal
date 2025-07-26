const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ["student", "counsellor", "admin"],
    default: "student"
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  // Role-specific fields
  organization: {
    type: String,
    required: function() { return this.role === "counsellor"; },
    trim: true
  },
  studentId: {
    type: String,
    required: function() { return this.role === "student"; },
    trim: true
  },
  // Additional fields
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre("save", async function(next) {
  // Update the updatedAt field
  this.updatedAt = new Date();

  // Hash password only if it's modified
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Update lastLogin method
userSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
