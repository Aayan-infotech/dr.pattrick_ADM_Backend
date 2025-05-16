const mongoose = require("mongoose");
const axios = require('axios');
const AdminGeneratedQuestion = require("../models/questionModel");

exports.getStudiesIdForAdminQuestion = async (req, res) => {
    try {
        const response = await axios.get('https://clinicaltrials.gov/api/v2/studies');

        const studies = response.data.studies || [];

        const data = studies.map(study =>
            study?.protocolSection?.identificationModule?.nctId)
        .filter(id => !!id);

        res.status(200).json({ success: true, totalCount: data.length, data})
    } catch (error) {
        console.error('Error Get Studies ID', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Add questions one or more than one at a same time by passing StudyId in params
exports.submitAdminQuestions = async (req, res) => {
  const studyId = req.params.studyId;
  const { questions } = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ message: "Questions array is required" });
  }

  try {
    // Format questions into array of { question: "..." }
    const formatted = questions.map(q => ({
      question: q
    }));

    const saved = await AdminGeneratedQuestion.findOneAndUpdate(
      { studyId },
      { $push: { questions: { $each: formatted } } },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, data: saved });
  } catch (error) {
    console.error("Submit Admin Questions Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all studies & question
exports.getAllQuestions = async (req, res) => {
  try {
    const all = await AdminGeneratedQuestion.find().sort({ createdAt: -1 });

    // Count total number of questions across all studies
    const totalQuestionsCount = all.reduce((sum, study) => {
      return sum + (study.questions?.length || 0);
    }, 0);

    res.status(200).json({
      success: true,
      totalStudiesCount: all.length,
      totalQuestionsCount,
      data: all
    });
  } catch (error) {
    console.error("get all question", error);
    res.status(500).json({ message: "Error getting all questions", error });
  }
};

// Get specific sub-question by its ID
exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;

    if (!mongoose.isValidObjectId(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID format.",
      });
    }

    // Find the parent document that contains the subdocument
    const document = await AdminGeneratedQuestion.findOne({
      "questions._id": questionId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    // Extract the specific question subdocument
    const question = document.questions.id(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found in document.",
      });
    }

    res.status(200).json({
      success: true,
      data: {
        studyId: document.studyId,    
        _id: question._id,
        question: question.question,

      },
    });
  } catch (error) {
    console.error("get question", error);
    res.status(500).json({ message: "Error getting question", error });
  }
};

// Update a single question by its subdocument _id
exports.updateQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { newQuestion } = req.body;

    if (!mongoose.isValidObjectId(questionId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid question ID." });
    }

    if (!newQuestion || typeof newQuestion !== "string") {
      return res.status(400).json({
        success: false,
        message: "New question is required and must be a string.",
      });
    }

    // Find the parent document that contains this question
    const document = await AdminGeneratedQuestion.findOne({
      "questions._id": questionId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    // Find and update the question inside the array
    const questionToUpdate = document.questions.id(questionId);

    if (!questionToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Question not found in document.",
      });
    }

    questionToUpdate.question = newQuestion.trim();
    await document.save();

    res.status(200).json({
      success: true,
      message: "Question updated successfully.",
      data: {
        _id: questionToUpdate._id,
        question: questionToUpdate.question,
        studyId: document.studyId,
      },
    });
  } catch (error) {
    console.error("update question", error);
    res
      .status(500)
      .json({ message: "Error updating question", error: error.message });
  }
};

// Delete a single question (subdocument) by its _id
exports.deleteQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;

    if (!mongoose.isValidObjectId(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID format.",
      });
    }

    // Find the parent document containing the question
    const document = await AdminGeneratedQuestion.findOne({
      "questions._id": questionId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Question not found.",
      });
    }

    // Remove the question subdocument by id
    document.questions.pull({ _id: questionId });

    if (document.questions.length === 0) {
      // If no questions remain, remove the whole document
      await AdminGeneratedQuestion.deleteOne({ _id: document._id });

      return res.status(200).json({
        success: true,
        message:
          "Last question deleted; entire question document removed from database.",
      });
    } else {
      // Otherwise save the updated document
      await document.save();

      return res.status(200).json({
        success: true,
        message: "Question deleted successfully.",
      });
    }
  } catch (error) {
    console.error("delete question", error);
    res.status(500).json({
      message: "Error deleting question",
      error: error.message,
    });
  }
};



