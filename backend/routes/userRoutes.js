const express = require("express");
const router = express.Router();
const User = require("../models/User");

// ======================
// GET ALL USERS
// ======================
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// UPDATE PROFILE (SELF)
// ======================
router.put("/me", async (req, res) => {
  try {
    const { username, bio, avatar } = req.body;

    const updateData = {};
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;

    const user = await User.findOneAndUpdate(
      { username },
      updateData,
      { new: true }
    );

    res.json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

// ======================
// UPDATE ANY USER (ADMIN)
// ======================
router.put("/:id", async (req, res) => {
  try {
    const { username, bio, avatar, password } = req.body;

    const updateData = {};

    if (username) updateData.username = username;
    if (bio) updateData.bio = bio;
    if (avatar) updateData.avatar = avatar;
    if (password) updateData.password = password;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ======================
// DELETE USER
// ======================
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;