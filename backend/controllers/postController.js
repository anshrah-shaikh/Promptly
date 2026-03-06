const Post = require("../models/Post");

// Create post
const createPost = async (req, res) => {
  try {
    const { text, author, category } = req.body;

    const newPost = new Post({
      text,
      author,
      category,
    });

    const saved = await newPost.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    post.likes += 1;
    await post.save();

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, likePost, deletePost };