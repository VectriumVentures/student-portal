const express = require("express");
const router = express.Router();
const { Signup, login, logout } = require("../controllers/authController");



// Authentication routes
router.post("/register", Signup);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
