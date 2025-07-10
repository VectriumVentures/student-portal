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

const Signup = async (req, res) => {
   try {
    const { name, email, password, role } = req.body;
    
    console.log("Registration request:", { name, email, role });
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "Name, email, and password are required" 
      });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: "User already exists with this email" 
      });
    }
    
    // Create new user (password will be hashed by the pre-save middleware)
    const newUser = new User({
       name,
      email,
      password, // Don't hash here - let the model handle it
      role: role || "student"
    });
    
    await newUser.save();
    
    res.status(201).json({ 
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
   });
    console.log("✅ User registered successfully:", newUser.email);

    
  } 
  catch (error) {
    console.error("Registration error:", error);
    
    // Handle validation errors
     if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation error",
        errors: errors
      });
    }
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: "Email already exists" 
      });
    }
    
    res.status(500).json({ 
      message: "Server error during registration",
      error: error.message
    });
  }}


  // This function handles user login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log("Login request:", { email });
    
    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email and password are required" 
      });
    }
    
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Check password using the model method
    const isMatch = await user.comparePassword(password);
 if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role,
        email: user.email 
      },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "24h" }
    );
    
    res.json({
      message: "Login successful",
      role: user.role,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Server error during login",
      error: error.message
    });
  }
}
const logout = (req, res) => {
  res
    .clearCookie("token")
    .json({ msg: "Logged out" });
};

module.exports = { Signup, login, logout };
