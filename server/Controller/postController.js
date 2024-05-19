const Post = require("../Model/postModel");
const { User } = require("../Model/userModel");
const Comment = require("../Model/commentModel");

// Create a new post
exports.createPost = async (req, res) => {
  const { text, photo } = req.body;

  try {
    const post = new Post({
      user: req._id,
      text,
      photo,
    });
    await post.save();

    const user = await User.findById(req._id);
    user.posts.push(post._id);
    await user.save();

    // res.status(201).json(post);
    res.status(201).send({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// get posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).populate("user").sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// get user posts
exports.getUserPosts = async (req, res) => {
  const { id } = req.params;
  try {
    const posts = await Post.find({ user: id })
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!post.likes.includes(req._id)) {
      post.likes.push(req._id);
      await post.save();
    }

    // res.status(200).json(post);
    res.status(200).send({
      success: true,
      message: "Post liked successfully",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Dislike a post
exports.dislikePost = async (req, res) => {
  const { postId, userId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const likeIndex = post.likes.indexOf(userId);
    if (likeIndex === -1) {
      return res.status(400).json({ message: "Post not liked yet" });
    }

    post.likes.splice(likeIndex, 1);
    await post.save();

    // res.status(200).json({ message: "Post disliked", post });
    res.status(200).send({
      success: true,
      message: "Post disliked",
      post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Comment on a post
exports.commentOnPost = async (req, res) => {
  // const postId = req.params.id;
  const { postId, text } = req.body;
  console.log({ postId, text });

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      user: req._id,
      post: postId,
      text,
    });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    // res.status(201).json(comment);
    res.status(201).send({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Get comments by post ID
exports.getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;

  try {
    // Verify that the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Fetch comments for the given post ID and populate user details
    const comments = await Comment.find({ post: postId })
      .populate("user")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Comments fetched successfully",
      comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Get posts from users the current user is following
exports.getFollowedUsersPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate("following");
    const followedUsers = user.following.map(
      (followingUser) => followingUser._id
    );

    const posts = await Post.find({ user: { $in: followedUsers } })
      .populate("user", "name photo")
      .sort({ createdAt: -1 });
    // res.status(200).json(posts);
    res.status(200).send({
      success: true,
      message: "Posts fetched successfully",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Follow a user
exports.followUser = async (req, res) => {
  const userIdToFollow = req.params.id;

  try {
    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(req.user.userId);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!currentUser.following.includes(userIdToFollow)) {
      currentUser.following.push(userIdToFollow);
      userToFollow.followers.push(req.user.userId);
      await currentUser.save();
      await userToFollow.save();
    }

    // res.status(200).json({ message: 'User followed successfully' });
    res.status(201).send({
      success: true,
      message: "User followed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  const userIdToUnfollow = req.params.id;

  try {
    const userToUnfollow = await User.findById(userIdToUnfollow);
    const currentUser = await User.findById(req.user.userId);

    if (!userToUnfollow) {
      return res.status(404).json({ message: "User not found" });
    }

    currentUser.following.pull(userIdToUnfollow);
    userToUnfollow.followers.pull(req.user.userId);
    await currentUser.save();
    await userToUnfollow.save();

    // res.status(200).json({ message: "User unfollowed successfully" });
    res.status(200).send({
      success: true,
      message: "User unfollowed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};
