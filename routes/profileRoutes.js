const express = require('express');
const router = express.Router();
const conditionController = require('../controllers/profileController');

// router.post('/conditionWithProcedureAdd', conditionController.createConditionWithProcedure );
// router.get('/get-all-conditions', conditionController.getAllConditions );
// router.get('/:id/get', conditionController.getConditionById );
// router.put('/:id/update', conditionController.updateCondition);
// router.delete('/:id/delete', conditionController.deleteCondition);


router.post('/addd', conditionController.createCondition);

module.exports = router;