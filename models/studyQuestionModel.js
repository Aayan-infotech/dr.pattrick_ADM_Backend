const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    id: String,
    questionText: String,
    answerType: {
      type: String,
      enum: ["yes_no", "single_choice", "multiple_choice", "text", "number"],
    },
    options: [String],
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

module.exports = mongoose.model("StudyQuestion", studyQuestionSchema);