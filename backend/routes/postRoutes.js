const express = require("express");
const router = express.Router();

const { 
  createPost, 
  getPosts, 
  likePost, 
  deletePost,
  updatePost   // ✅ ADD THIS
} = require("../controllers/postController");

router.post("/", createPost);
router.put("/:id", updatePost);   // now works ✅
router.get("/", getPosts);
router.post("/:id/like", likePost);
router.delete("/:id", deletePost);

module.exports = router;