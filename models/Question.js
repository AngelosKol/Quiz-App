const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  category: String,
  id: String,
  correctAnswer: String,
  incorrectAnswers: [String],
  question: String,
  tags: [String],
  type: String,
  difficulty: String,
  regions: [String],
  isNiche: Boolean,
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
