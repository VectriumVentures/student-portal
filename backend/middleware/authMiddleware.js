const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to verify JWT token
const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in cookies first, then in Authorization header
    if (req.cookies.token) {
      token = req.cookies.token;
    } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        msg: "Access denied. No token provided.",
        requiresAuth: true
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        msg: "Access denied. User not found.",
        requiresAuth: true
      });
    }

    if (!user.isActive) {
      return res.status(401).json({
        msg: "Access denied. Account is deactivated.",
        requiresAuth: true
      });
    }

    // Add user to request object
    req.user = user;
    next();

  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        msg: "Access denied. Invalid token.",
        requiresAuth: true
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        msg: "Access denied. Token expired.",
        requiresAuth: true
      });
    }

    return res.status(500).json({
      msg: "Server error during authentication"
    });
  }
};

// Middleware to check user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        msg: "Access denied. Authentication required.",
        requiresAuth: true
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        msg: `Access denied. Required role: ${roles.join(" or ")}. Your role: ${req.user.role}`,
        insufficientPermissions: true
      });
    }

    next();
  };
};

// Middleware to check if user owns the resource or is admin
const authorizeOwnerOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      msg: "Access denied. Authentication required.",
      requiresAuth: true
    });
  }

  const resourceUserId = req.params.userId || req.body.userId;

  if (req.user.role === "admin" || req.user._id.toString() === resourceUserId) {
    next();
  } else {
    return res.status(403).json({
      msg: "Access denied. You can only access your own resources.",
      insufficientPermissions: true
    });
  }
};

// Middleware to update last login time
const updateLastLogin = async (req, res, next) => {
  if (req.user) {
    try {
      await req.user.updateLastLogin();
    } catch (error) {
      console.error("Error updating last login:", error);
      // Don't fail the request if this fails
    }
  }
  next();
};

module.exports = {
  protect,
  authorize,
  authorizeOwnerOrAdmin,
  updateLastLogin
};
