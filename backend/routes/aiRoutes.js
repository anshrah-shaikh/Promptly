const express = require("express");
const router = express.Router();

const { generatePrompt } = require("../controllers/aiController");

router.post("/generate", generatePrompt);

module.exports = router;