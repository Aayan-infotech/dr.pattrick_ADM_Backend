const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    questionText: String,
  }
);

const studyQuestionSchema = new mongoose.Schema(
  {
    studyId: { type: String, required: true, unique: true },
    briefSummary: { type: String, required: true },
    questions: [questionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminAIGeneratedQuestion", studyQuestionSchema);