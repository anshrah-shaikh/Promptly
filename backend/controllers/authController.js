const User = require("../models/User");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.create({ username, password });

    res.json({ message: "User created", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔐 Create token INCLUDING role
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role   // ⭐ ADD THIS
      },
      "secretkey",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        username: user.username,
        id: user._id,
        bio: user.bio,
        avatar: user.avatar,
        role: user.role   // ⭐ ADD THIS TOO
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};