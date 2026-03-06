const express = require("express");
const router = express.Router();

const { addComment, getComments } = require("../controllers/commentController");

router.post("/:postId", addComment);
router.get("/:postId", getComments);

router.delete("/delete/:id", async (req, res) => {
  try {
    const Comment = require("../models/Comment");
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;