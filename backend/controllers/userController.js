const User = require("./models/User");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// @desc
// @route
// @access
const createUser = asyncHandler(async (req, res) => {});

module.exports = {createUser}
