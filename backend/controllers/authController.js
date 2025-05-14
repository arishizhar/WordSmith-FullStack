const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtokens")
const asyncHandler = require("express-async-handler")

// @desc Login
// @route POST /auth/login
// @access Public 
const login = asyncHandler(async(req, res) => {
    //logic
})

// @desc Refresh token
// @route POST /auth/refresh
// @access Public 
const refresh = asyncHandler(async(req, res) => {
    //logic
})

// @desc Logout - removes cookie
// @route POST /auth/logout
// @access Public 
const logout = asyncHandler(async(req, res) => {
    //logic
})

module.exports = {
    login, refresh, logout
}