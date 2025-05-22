const StudyAnswer = require("../models/adminAIAnswerModel");
 
exports.getAllUserAnswersOfAIQusetions = async (req, res) => {
    try {
      const responses = await StudyAnswer.find();
      res.status(200).json({ success: true, totalAnswerCount: responses.length, data: responses });

    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.getUserAnswersOfAIQusetionsByAnswerId = async (req, res) => {
    const { answerId } = req.params;

    try {
      const studyAnswerDoc = await StudyAnswer.findOne(
        { "answers._id": answerId },
        { "answers.$": 1 }
      );
  
      if (!studyAnswerDoc || !studyAnswerDoc.answers || studyAnswerDoc.answers.length === 0) {
        return res.status(404).json({ message: "Specific answer not found." });
      }
  
      res.status(200).json({ success: true, data: studyAnswerDoc.answers[0] });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
exports.deleteUserAnswersOfAIQusetionsByAnswerId = async (req, res) => {
    const { answerId } = req.params;

    try {
      // First, find the document that contains the specific answer
      const studyAnswerDoc = await StudyAnswer.findOne({ "answers._id": answerId });
  
      if (!studyAnswerDoc) {
        return res.status(404).json({ message: "Answer not found." });
      }
  
      // Remove the answer from the array
      studyAnswerDoc.answers = studyAnswerDoc.answers.filter(
        (ans) => ans._id.toString() !== answerId
      );
  
      // If no answers remain, remove the `answers` field
      if (studyAnswerDoc.answers.length === 0) {
        studyAnswerDoc.set("answers", undefined, { strict: false }); // Unset `answers`
      }
  
      // Save the updated document
      await studyAnswerDoc.save();
  
      res.status(200).json({ success: true, message: "Answer deleted successfully." });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  
