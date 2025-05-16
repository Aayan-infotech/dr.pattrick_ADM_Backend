const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
  }
);

const questionListSchema = new mongoose.Schema(
  {
    studyId: { type: String, required: true, unique: true },
    questions: { type: [questionSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AdminGeneratedQuestion", questionListSchema);
