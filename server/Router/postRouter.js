const express = require("express");
const router = express.Router();
const postController = require("../Controller/postController");
const authMiddleware = require("../middleware/authMiddleware");

// Create a new post
router.post("/new", authMiddleware, postController.createPost);
// get posts
router.get("/", authMiddleware, postController.getPosts);
router.get("/:id", authMiddleware, postController.getUserPosts);

// Like a post
router.post("/:id/like", authMiddleware, postController.likePost);
router.post("/dislike", authMiddleware, postController.dislikePost);

// Comment on a post
router.post("/comment", authMiddleware, postController.commentOnPost);
router.get("/comments/:id", postController.getCommentsByPostId);

// Get posts from followed users
router.get("/following", authMiddleware, postController.getFollowedUsersPosts);

// Follow a user
router.post("/follow/:id", authMiddleware, postController.followUser);

// Unfollow a user
router.post("/unfollow/:id", authMiddleware, postController.unfollowUser);

module.exports = router;
