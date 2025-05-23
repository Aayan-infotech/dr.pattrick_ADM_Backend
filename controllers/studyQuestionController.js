const StudyQuestion = require('../models/studyQuestionModel');
const axios = require("axios");

exports.addManualQuestionToStudy = async (req, res) => {
  const { studyId } = req.params;
  const { questionText, answerType, options } = req.body;

  try {
    const study = await StudyQuestion.findOne({ studyId });

    if (!study) {
      return res.status(404).json({ message: "Study not found." });
    }

    if (!questionText || !answerType) {
      return res.status(400).json({ message: "questionText and answerType are required." });
    }

    const validAnswerTypes = ["yes_no", "single_choice", "multiple_choice", "text", "number"];
    if (!validAnswerTypes.includes(answerType)) {
      return res.status(400).json({ message: "Invalid answerType." });
    }

    // Generate a custom incremental ID like q6, q7, etc.
    const lastIdNumber = study.questions
      .map(q => q.id?.replace('q', ''))
      .filter(id => !isNaN(id))
      .map(Number)
      .sort((a, b) => b - a)[0] || 0;

    const newQuestion = {
      id: `q${lastIdNumber + 1}`,
      questionText,
      answerType,
      options: Array.isArray(options) ? options : [],
    };

    study.questions.push(newQuestion);
    await study.save();

    return res.status(200).json({
      success: true,
      message: "Manual question added to study.",
      data: newQuestion,
    });

  } catch (error) {
    console.error("Error adding manual question:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getAllStudyQuestions = async (req, res) => {
  try {
    const studies = await StudyQuestion.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, totalCount: studies.length, data: studies });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getStudyQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await StudyQuestion.findById(id);
    if (!question) {
      return res.status(404).json({ message: "Study question not found" });
    }
    res.status(200).json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    // Search for a StudyQuestion document where any question._id matches questionId
    const studyQuestion = await StudyQuestion.findOne({
      "questions._id": questionId,
    });

    if (!studyQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    const question = studyQuestion.questions.id(questionId);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    res.status(200).json({
      success: true,
      studyId: studyQuestion.studyId,
      question,
    });
  } catch (error) {
    console.error("Error fetching question by ID:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteQuestionById = async (req, res) => {
  const { questionId } = req.params;

  try {
    // Find the document containing the question
    const studyQuestion = await StudyQuestion.findOne({ "questions._id": questionId });

    if (!studyQuestion) {
      return res.status(404).json({ message: "Question not found." });
    }

    // Remove the question by filtering it out
    studyQuestion.questions = studyQuestion.questions.filter(
      (q) => q._id.toString() !== questionId
    );

    if (studyQuestion.questions.length === 0) {
      // If no questions left, delete the entire document
      await StudyQuestion.findByIdAndDelete(studyQuestion._id);

      return res.status(200).json({
        success: true,
        message: "Last question deleted; entire study question document removed.",
      });
    } else {
      // Otherwise, just save the updated document
      await studyQuestion.save();

      return res.status(200).json({
        success: true,
        message: "Question deleted successfully."
      });
    }
  } catch (error) {
    console.error("Error deleting question:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};