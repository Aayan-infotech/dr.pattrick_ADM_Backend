const express = require('express');
const router = express.Router();
const adminAIQuestionController = require('../controllers/adminAIQuestionController');

router.get('/get-studies-ids', adminAIQuestionController.getStudiesId);
router.post('/admin-ai-generated-questions/:studyId', adminAIQuestionController.generateStudyQuestions);

module.exports = router;