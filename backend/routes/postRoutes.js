const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyJWT = require("../middleware/verifyJWT");

// Get a single post
router.route("/:id").get(postController.getPost);

// Get all posts
router.route("/all").get(postController.getAllPosts);

// Create a new post (protected)
router.route("/").post(verifyJWT, postController.createPost);

// Update a post by ID (protected)
router.route("/:id").put(verifyJWT, postController.updatePost);

// Delete a post by ID (protected)
router.route("/:id").delete(verifyJWT, postController.deletePost);

module.exports = router;
