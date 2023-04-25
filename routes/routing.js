const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

async function fetchTriviaData(endpoint) {
  const response = await fetch(`${endpoint}`);
  const data = response.json();
  return data;
}

router.get("/", async (req, res) => {
  const { category, difficulty } = req.query;

  try {
    let query = {};

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const questions = await Question.find(query);
    res.status(200).json({ success: true, data: questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "Something went wrong" });
  }
});

// Store the trivia data in MongoDB
// router.get("/trivia", async (req, res) => {
//   const triviaData = await fetchTriviaData(
//     `https://the-trivia-api.com/api/questions?limit=20`
//   );

//   triviaData.forEach(async (trivia) => {
//     const existingQuestion = await Question.findOne({ id: trivia.id });

//     if (!existingQuestion) {
//       const newQuestion = new Question(trivia);
//       await newQuestion.save();
//     }
//   });

//   res.send("Trivia data stored in MongoDB");
// });

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
