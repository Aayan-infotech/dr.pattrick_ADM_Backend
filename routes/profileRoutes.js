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
router.get('/routines/:id', conditionController.getRoutineById);       
router.put('/routines/:id', conditionController.updateRoutineById);   
router.delete('/routines/:id', conditionController.deleteRoutineById); 


// Routes for Family Histories
router.post('/family-histories', conditionController.createFamilyHistory);
router.get('/family-histories', conditionController.getAllFamilyHistories);
router.get('/family-histories/:id', conditionController.getFamilyHistoryById);         
router.put('/family-histories/:id', conditionController.updateFamilyHistoryById);   
router.delete('/family-histories/:id', conditionController.deleteFamilyHistoryById); 

module.exports = router;