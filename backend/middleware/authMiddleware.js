const jwt = require("jsonwebtoken");

const protect = (roles = []) => {
  return (req, res, next) => {
    // Read JWT token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ msg: "Not authenticated. Please log in." });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ msg: "Invalid or expired token." });
      }

      // If role-based access control is required:
      if (roles.length > 0 && !roles.includes(decoded.role)) {
        return res.status(403).json({ msg: "Access denied: insufficient permissions." });
      }

      // Attach user info to the request object
      req.user = decoded;
      next();
    });
  };
};

module.exports = { protect };
