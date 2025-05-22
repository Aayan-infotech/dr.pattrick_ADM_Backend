const express = require('express');
const router = express.Router();
const studyAnswerController = require('../controllers/adminAIAnswerController');

router.get("/get-all-answers", studyAnswerController.getAllUserAnswersOfAIQusetions);
router.get("/get-answer/:answerId", studyAnswerController.getUserAnswersOfAIQusetionsByAnswerId);
router.delete("/delete-answer/:answerId", studyAnswerController.deleteUserAnswersOfAIQusetionsByAnswerId);

module.exports = router;