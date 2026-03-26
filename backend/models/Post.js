const mongoose = require("mongoose"); 

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "anonymous",
    },
    avatar: {                // 🔥 ADD THIS
      type: String,
      default: "",
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);