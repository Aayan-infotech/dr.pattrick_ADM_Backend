const mongoose = require("mongoose");
const AdminQuestions = require("../models/questionModel");

// Add multiple questions
exports.addQuestion = async (req, res) => {
  try {
    const { questions } = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Questions array is required." });
    }

    // Validate each question
    for (const q of questions) {
      if (typeof q !== "string" || !q.trim()) {
        return res.status(400).json({
          success: false,
          message: "Each question must be a non-empty string.",
        });
      }
    }

    const formattedQuestions = questions.map((q) => ({ question: q.trim() }));

    const newEntry = new AdminQuestions({ questions: formattedQuestions });
    const saved = await newEntry.save();

    res.status(200).json({
      success: true,
      message: "Questions added successfully.",
      data: saved,
    });
  } catch (error) {
    console.error("add question", error);
    res.status(500).json({ message: "Error add question", error });
  }
};

// Get all question
exports.getAllQuestions = async (req, res) => {
  try {
    const all = await AdminQuestions.find().sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: all });
  } catch (error) {
    console.error("get all question", error);
    res.status(500).json({ message: "Error getting all questions", error });
  }
};

// Get question by ID
exports.getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;

    if (!mongoose.isValidObjectId(questionId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid question ID format." });
    }

    // Find the parent document that contains the question with this ID
    const document = await AdminQuestions.findOne({
      "questions._id": questionId,
    });

    if (!document) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    // Return the full document
    res.status(200).json({
      success: true,
      data: document,
    });
  } catch (error) {
    console.error("get question", error);
    res.status(500).json({ message: "Error getting question", error });
  }
};

// Update single question in a set by question _id
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

    // Find the document that contains the question with given ID
    const document = await AdminQuestions.findOne({
      "questions._id": questionId,
    });

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Question not found in any document.",
      });
    }

    // Find the question and update it
    const questionToUpdate = document.questions.id(questionId);
    questionToUpdate.question = newQuestion.trim();

    await document.save();

    res.status(200).json({
      success: true,
      message: "Question updated successfully.",
      data: document,
    });
  } catch (error) {
    console.error("update question", error);
    res
      .status(500)
      .json({ message: "Error updating question", error: error.message });
  }
};

// Delete a single question by question _id
// exports.deleteQuestionById = async (req, res) => {
//   try {
//     const questionId = req.params.id;

//     if (!mongoose.isValidObjectId(questionId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid question ID." });
//     }

//     // Step 1: Find the parent document that contains the question
//     const parentDoc = await AdminQuestions.findOne({
//       "questions._id": questionId,
//     });

//     if (!parentDoc) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Question not found." });
//     }

//     // Step 2: Pull the question from the array
//     const updated = await AdminQuestions.findByIdAndUpdate(
//       parentDoc._id,
//       { $pull: { questions: { _id: questionId } } },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Question deleted successfully.",
//       data: updated,
//     });
//   } catch (error) {
//     console.error("delete question", error);
//     res.status(500).json({ message: "Error deleting question", error });
//   }
// };

exports.deleteQuestionById = async (req, res) => {
  try {
    const { docId, questionId } = req.params;

    // Validate ObjectIds
    if (
      !mongoose.isValidObjectId(docId) ||
      !mongoose.isValidObjectId(questionId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid document or question ID.",
      });
    }

    // First, find the document and check if the question exists within it
    const document = await AdminQuestions.findById(docId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: "Document not found.",
      });
    }

    const questionExists = document.questions.id(questionId);
    if (!questionExists) {
      return res.status(400).json({
        success: false,
        message: "This question does not belong to the given document.",
      });
    }

    // Now, remove the question
    const updatedDoc = await AdminQuestions.findOneAndUpdate(
      { _id: docId },
      { $pull: { questions: { _id: questionId } } },
      { new: true }
    );

    // Double-check in case something went wrong
    if (!updatedDoc) {
      return res.status(500).json({
        success: false,
        message: "Failed to update document after removing question.",
      });
    }

    // If no questions remain, delete the document
    if (updatedDoc.questions.length === 0) {
      await AdminQuestions.findByIdAndDelete(docId);
      return res.status(200).json({
        success: true,
        message:
          "Last question deleted. Document removed as it had no more questions.",
      });
    }

    // Respond with updated document
    res.status(200).json({
      success: true,
      message: "Question deleted successfully.",
      data: updatedDoc,
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
