const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

// @desc get post
// @route GET /api/post/:id
// @access PUBLIC
const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  const post = await Post.findById(id).populate(
    "author",
    "firstname username email avatarImage"
  );

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  res.status(200).json(post);
});

// @desc Create new post
// @route POST /api/post/new
// @access PRIVATE
const createPost = asyncHandler(async (req, res) => {
  const { title, coverImage, content } = req.body;

  // Validate content
  if (
    !title ||
    !content ||
    typeof content !== "object" ||
    !Array.isArray(content.content) ||
    content.content.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Title or content cannot be missing" });
  }

  // Check if user is logged in
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Validate cover image only if provided
  if (
    coverImage !== undefined &&
    (typeof coverImage !== "string" || coverImage.trim() === "")
  ) {
    return res.status(400).json({
      message: "Cover image must be a non-empty string if provided",
    });
  }

  // Build new post object
  const newPostObject = {
    title,
    content,
    author: userId,
  };

  if (coverImage) {
    newPostObject.coverImage = coverImage.trim();
  }

  // Save post
  const newPost = await Post.create(newPostObject);

  return res.status(201).json({
    message: "Post created successfully",
    id: newPost._id,
    title: newPost.title,
    coverImage: newPost.coverImage || null,
    content: newPost.content,
  });
});

// @desc User can update and edit post
// @route PUT /api/post/:id
// @access PRIVATE
const updatePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  const { title, content, coverImage } = req.body;

  //check if current user is the author of post
  if (post.author.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "not authorized to update this post" });
  }

  //validation for fields
  if (
    title !== undefined &&
    (typeof title !== "string" || title.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "title must be a non empty string" });
  }

  if (content !== undefined) {
    if (
      typeof content !== "object" ||
      !Array.isArray(content.content) ||
      content.content.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Content must be valid TipTap JSON" });
    }
  }

  if (
    coverImage !== undefined &&
    (typeof coverImage !== "string" || coverImage.trim() === "")
  ) {
    return res
      .status(400)
      .json({ message: "cover img must be a non empty string if provided" });
  }

  //update only the given fields
  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (coverImage !== undefined) post.coverImage = coverImage.trim();

  const updatedPost = await post.save();

  //Return updated post
  return res.status(200).json({
    message: "Post updated successfully",
    post: {
      id: updatedPost._id,
      title: updatedPost.title,
      content: updatedPost.content,
      coverImage: updatedPost.coverImage || null,
    },
  });
});

// @desc delete post
// @route DELETE /api/post/:id
// @access PROTECTED
const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID format" });
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "post not found" });
  }

  // check if the correct user is authorized
  if (post.author.toString() !== req.user._id.toString()) {
    return res
      .status(403)
      .json({ message: "You are not authorized to delete this post" });
  }

  await post.deleteOne();

  return res.status(200).json({ message: "post deleted successfully" });
});

// @desc get all post
// @route GET /api/post/all
// @access PUBLIC
const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ createdAt: -1 })
    .populate("author", "firstname lastname username email avatarImage");

  res.status(200).json(posts);
});

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
