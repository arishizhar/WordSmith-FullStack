const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc create new user
// @route POST /api/user/register
// @access PUBLIC
const createUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, username, password, email, avatarImage } =
    req.body;

  //confirm data
  if (!firstname || !lastname || !username || !password || !email) {
    return res.status(400).json({ message: "missing data" });
  }

  //check for existing email or username
  const existingUsername = await User.findOne({ username });
  const existingEmail = await User.findOne({ email });

  if (existingUsername) {
    return res.status(409).json({ message: "This username is taken" });
  }

  if (existingEmail) {
    return res.status(409).json({ message: "This Email is taken" });
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserObject = {
    firstname,
    lastname,
    username,
    email,
    password: hashedPassword,
    avatarImage: avatarImage || "",
  };

  const newUser = await User.create(newUserObject);

  return res.status(201).json({
    id: newUser._id,
    firstname: newUser.firstname,
    lastname: newUser.lastname,
    username: newUser.username,
    email: newUser.email,
    avatarImage: newUser.avatarImage,
  });
});

// @desc get current user info
// @route GET /api/user/me
// @access PRIVATE
const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json(user);
});

// @desc Update user avatar
// @route PUT /api/user/avatar
// @access Private
const updateAvatarImage = asyncHandler(async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  const { avatarImage } = req.body;

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (
    !avatarImage ||
    typeof avatarImage !== "string" ||
    avatarImage.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "Missing or invalid avatar image link" });
  }

  user.avatarImage = avatarImage.trim();
  await user.save();

  res.status(200).json({
    message: "Avatar updated successfully",
    avatarImage: user.avatarImage,
  });
});

module.exports = { createUser, me, updateAvatarImage };
