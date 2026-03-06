const express = require("express");
const router = express.Router();
const User = require("../models/User");

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE PROFILE
router.put("/me", async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;

    const user = await User.findOneAndUpdate(
      { username },
      { bio, avatar },
      { new: true }
    );

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;