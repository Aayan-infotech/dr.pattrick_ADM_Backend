const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
});

const questionListSchema = new mongoose.Schema(
  {
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AdminQuestions', questionListSchema);
