const Comment = require("../models/Comment");

// Add comment
const addComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const { postId } = req.params;

    const newComment = new Comment({
      postId,
      text,
      author,
    });

    const saved = await newComment.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get comments for a post
const getComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addComment, getComments };