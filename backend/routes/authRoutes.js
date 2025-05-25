const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
// const passwordResetController = require("../controllers/passwordResetController");
const loginLimiter = require("../middleware/loginLimiter");
const verifyJWT = require("../middleware/verifyJWT");

// @desc Login user and return access token
// @route POST /auth/login
// @access Public
router.post("/login", loginLimiter, authController.login);

// @desc Refresh access token using refresh token cookie
// @route POST /auth/refresh
// @access Public
router.post("/refresh", authController.refresh);

// @desc Logout user and clear refresh token cookie
// @route POST /auth/logout
// @access Private
router.post("/logout", verifyJWT, authController.logout);

// @desc Request password reset link via email
// @route POST /auth/request-reset
// @access Public
router.post("/request-reset", authController.requestPasswordReset);

// @desc Reset password using token from email
// @route POST /auth/reset-password
// @access Public
router.post("/reset-password", authController.resetPassword);

module.exports = router;
