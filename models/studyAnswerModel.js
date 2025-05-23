const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  questionId: { type: String, required: true },
  answerType: {
    type: String,
    enum: ["yes_no", "single_choice", "multiple_choice", "text", "number"],
    required: true,
  },
  answer: { type: mongoose.Schema.Types.Mixed, required: true },
});

const studyResponseSchema = new mongoose.Schema(
  {
    studyId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId,ref: "User", required: true },
    answers: [answerSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudyAnswer", studyResponseSchema);