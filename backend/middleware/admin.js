const jwt = require("jsonwebtoken");

const adminOnly = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "secretkey");

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin only" });
    }

    next(); // allow request to continue

  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = adminOnly;