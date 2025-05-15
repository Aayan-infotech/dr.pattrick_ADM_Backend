const express = require('express');
const router = express.Router();
const adminAIQuestionController = require('../controllers/adminAIQuestionController');

router.get('/get-studies-ids', adminAIQuestionController.getStudiesId);
router.post('/admin-ai-generated-questions/:studyId', adminAIQuestionController.generateStudyQuestions);
router.get('/get-all-studies-ai-generated-question', adminAIQuestionController.getAllGeneratedQuestions);
router.get('/get-study-ai-question/:questionId', adminAIQuestionController.getGeneratedQuestionById);
router.delete('/delete-study-ai-generated-question/:subQuestionId', adminAIQuestionController.deleteGeneratedQuestionById);

module.exports = router;