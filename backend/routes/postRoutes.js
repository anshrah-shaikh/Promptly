const express = require("express");
const router = express.Router();

const { createPost, getPosts, likePost, deletePost } =
  require("../controllers/postController");

router.post("/", createPost);
router.get("/", getPosts);
router.post("/:id/like", likePost);

router.delete("/:id", deletePost);

module.exports = router;