const express = require('express');
const router = express.Router();
const questionsController = require('../controllers/questionController');

router.post('/add-new-question', questionsController.addQuestion);
router.get('/get-all-questions', questionsController.getAllQuestions);
router.get('/get-question/:id', questionsController.getQuestionById);
router.put('/update-question/:id', questionsController.updateQuestionById);
router.delete('/delete-question/:id', questionsController.deleteQuestionById);

module.exports = router;