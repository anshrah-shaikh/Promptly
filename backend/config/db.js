// config/db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("Trying to connect to MongoDB...");

    // Mongoose 7+ handles parsing automatically, no options needed
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Atlas Connected ✅");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;