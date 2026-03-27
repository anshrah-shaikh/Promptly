const Post = require("../models/Post");
const User = require("../models/User"); // 🔥 ADD THIS

// Create post
const createPost = async (req, res) => {
  try {
    const { text, author, category, avatar } = req.body;

    const newPost = new Post({
      text,
      author,
      category,
      avatar: avatar || ""   // 🔥 THIS IS THE FIX
    });

    const saved = await newPost.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE POST
const updatePost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { text },
      { new: true }
    );

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all posts

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    // 🔥 attach latest user data
    const postsWithUser = await Promise.all(
      posts.map(async (p) => {
        const user = await User.findOne({ username: p.author });

        return {
          ...p._doc,
          avatar: user?.avatar || "",
          username: user?.username || p.author
        };
      })
    );

    res.json(postsWithUser);
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

module.exports = { createPost, getPosts, likePost, deletePost, updatePost };