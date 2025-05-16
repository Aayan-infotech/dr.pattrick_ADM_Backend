const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionController');

router.get('/get-all-study-ids', questionsController.getStudiesIdForAdminQuestion);
router.post('/add-new-question/:studyId', questionsController.submitAdminQuestions);
router.get('/get-all-questions', questionsController.getAllQuestions);
router.get('/get-question/:id', questionsController.getQuestionById);
router.put('/update-question/:id', questionsController.updateQuestionById);
router.delete('/delete-question/:id', questionsController.deleteQuestionById);


module.exports = router;