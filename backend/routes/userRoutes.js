const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");

router.route("/register").post(userController.createUser);
router.route("/me").post(verifyJWT, userController.me);


module.exports = router;
