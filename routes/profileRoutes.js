const express = require('express');
const router = express.Router();
const conditionController = require('../controllers/profileController');


// Routes for Conditions
router.post('/conditions', conditionController.createCondition);
router.get('/conditions', conditionController.getAllConditions);
router.get('/conditions/:id', conditionController.getConditionById);
router.put('/conditions/:id', conditionController.updateConditionById);
router.delete('/conditions/:id', conditionController.deleteConditionById);

// Routes for Medications
router.post('/medications', conditionController.createMedication);
router.get('/medications', conditionController.getAllMedications);
router.get('/medications/:id', conditionController.getMedicationById);
router.put('/medications/:id', conditionController.updateMedicationById);
router.delete('/medications/:id', conditionController.deleteMedicationById);

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

