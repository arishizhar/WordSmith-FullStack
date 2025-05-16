const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const verifyJWT = require("../middleware/verifyJWT");

// @desc Get a single post by ID
// @route GET /api/posts/:id
// @access Public
router.route("/:id").get(postController.getPost);

// @desc Get all public posts
// @route GET /api/posts/all
// @access Public
router.route("/all").get(postController.getAllPosts);

// @desc Create a new post
// @route POST /api/posts
// @access Private
router.route("/").post(verifyJWT, postController.createPost);

// @desc Update a post by ID
// @route PUT /api/posts/:id
// @access Private
router.route("/:id").put(verifyJWT, postController.updatePost);

// @desc Delete a post by ID
// @route DELETE /api/posts/:id
// @access Private
router.route("/:id").delete(verifyJWT, postController.deletePost);

// @desc Toggle like on a post by ID
// @route PUT /api/posts/:id/like
// @access Private
router.route("/:id/like").put(verifyJWT, postController.toggleLikePost);

// @desc Toggle save on a post by ID
// @route PUT /api/posts/:id/save
// @access Private
router.route("/:id/save").put(verifyJWT, postController.toggleSavePost);

// @desc Get posts liked by current user
// @route GET /api/posts/liked
// @access Private
router.get("/liked", verifyJWT, postController.getLikedPosts);

// @desc Get posts saved by current user
// @route GET /api/posts/saved
// @access Private
router.get("/saved", verifyJWT, postController.getSavedPosts);

// @desc Get public posts by a specific username
// @route GET /api/posts/user/:username
// @access Public
router.get("/user/:username", postController.getPostsByUsername);

module.exports = router;
