const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const sendResetEmail = require("../utils/sendResetEmail");

// @desc Login
// @route POST /auth/login
// @access Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Both email and password fields are required" });
  }

  const foundUser = await User.findOne({ email }).exec();

  if (!foundUser) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Check password
  const isMatch = await bcrypt.compare(password, foundUser.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Unauthorized - wrong password" });
  }

  // Create JWT payload
  const payload = {
    UserInfo: {
      userId: foundUser._id,
      email: foundUser.email,
    },
  };

  // Sign token
  const accessToken = jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10s" } // For testing; use longer like '15m' in production
  );

  const refreshToken = jwt.sign(
    { userId: foundUser._id, email: foundUser.email },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  //create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Return access token
  res.status(200).json({ accessToken });
});

// @desc Refresh token
// @route POST /auth/refresh
// @access Public
const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err)
        return res.status(403).json({ message: "Forbidden - token invalid" });

      const foundUser = await User.findById(decoded.userId).exec();
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            userId: foundUser._id,
            email: foundUser.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10s" } // testing only
      );

      res.json({ accessToken });
    })
  );
});

// @desc Logout - removes cookie
// @route POST /auth/logout
// @access Public
const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "cookie cleared" });
});

// @desc Request password reset link
// @route POST /auth/request-reset
// @access Public
const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "email is required" });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: "User with email ID not found" });

  const resetToken = jwt.sign(
    { userId: user._id },
    process.env.RESET_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const resetLink = `https://frontend.com/reset-password?token=${resetToken}`;

  await sendResetEmail({
    to: user.email,
    subject: "Reset your password",
    html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  });

  res.status(200).json({ message: "Reset Link sent to email" });
});

// @desc Handle password reset
// @route POST /auth/reset-password
// @access Public
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token and new password are required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ message: "user not found" });
    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    res.status(200).json({ message: "password reset success" });
  } catch (err) {
    res.status(403).json({ message: "invalid or expired token" });
  }
});

module.exports = {
  login,
  refresh,
  logout,
  requestPasswordReset,
  resetPassword,
};
