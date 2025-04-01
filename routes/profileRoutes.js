const express = require('express');
const router = express.Router();
const conditionController = require('../controllers/profileController');


// Routes for Conditions
router.post('/conditions', conditionController.createCondition);
router.get('/conditions', conditionController.getAllConditions);

// Routes for Medications
router.post('/medications', conditionController.createMedication);
router.get('/medications', conditionController.getAllMedications);

// Routes for Routines
router.post('/routines', conditionController.createRoutine);
router.get('/routines', conditionController.getAllRoutines);

// Routes for Family Histories
router.post('/family-histories', conditionController.createFamilyHistory);
router.get('/family-histories', conditionController.getAllFamilyHistories);

module.exports = router;













// router.post('/conditionWithProcedureAdd', conditionController.createConditionWithProcedure );
// router.get('/get-all-conditions', conditionController.getAllConditions );
// router.get('/:id/get', conditionController.getConditionById );
// router.put('/:id/update', conditionController.updateCondition);
// router.delete('/:id/delete', conditionController.deleteCondition);


// router.post('/addd', conditionController.createCondition);

