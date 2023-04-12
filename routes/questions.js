const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get all Questions
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ success: true, data: questions });
  } catch (error) {
    console.log(error);

    res.status(500).json({ success: false, error: error.message });
  }
});

// Add a question
router.post("/", async (req, res) => {
  const question = new Question({
    category: req.body.category,
    type: req.body.type,
    difficulty: req.body.difficulty,
    question: req.body.question,
  });
  try {
    const savedQuestion = await question.save();
    res.json({ success: true, data: savedQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
