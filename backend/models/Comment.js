const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "anonymous",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);