const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc create new user
// @route POST /api/user/register
// @access PRIVATE
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

module.exports = { createUser };
