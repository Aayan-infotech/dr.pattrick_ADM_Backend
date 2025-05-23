const express = require('express');
const router = express.Router();
const studyAnswerController = require('../controllers/studyAnswerController');

router.get("/get-all-answers", studyAnswerController.getAllUserAnswersOfAIQusetions);
router.get('/get-all-answers/:userId', studyAnswerController.getAnswersByUserId);
router.get("/get-answer/:answerId", studyAnswerController.getUserAnswersOfAIQusetionsByAnswerId);
// sjhjs
router.delete("/delete-answer/:answerId", studyAnswerController.deleteUserAnswersOfAIQusetionsByAnswerId);

module.exports = router;