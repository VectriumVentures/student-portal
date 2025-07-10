const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Load environment variables FIRST
dotenv.config();

// Import database connection
const connectDB = require("./config/db"); // Import the function directly

const app = express();

// Connect to MongoDB
connectDB();

// Basic middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Test route to verify server is working
app.get("/", (req, res) => {
  res.json({ message: "🚀 Server is running!" });
});
// 🔥 ADD THESE MISSING AUTH ROUTES:
try {
  const authRoutes = require("./routes/authRoutes");
  app.use("/api/auth", authRoutes);
  console.log("✅ Auth routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading auth routes:", error.message);
  console.error("Make sure ./routes/authRoutes.js exists");
}
// Test route
// app.get("/test", (req, res) => {
//   res.json({ message: "Test route working!" });
// });

// Start server without database connection first
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Test URL: http://localhost:${PORT}/test`);
});
