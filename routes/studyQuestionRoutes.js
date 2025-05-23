const express = require('express');
const router = express.Router();
const studyQuestionController = require('../controllers/studyQuestionController');


router.post('/study-manual-questions/:studyId', studyQuestionController.addManualQuestionToStudy);
router.get('/studies/get-all', studyQuestionController.getAllStudyQuestions);
router.get('/get-question/:id', studyQuestionController.getStudyQuestionById);
router.get('/get-specific-question/:questionId', studyQuestionController.getQuestionById);
router.delete('/delete-specific-question/:questionId', studyQuestionController.deleteQuestionById);

module.exports = router;