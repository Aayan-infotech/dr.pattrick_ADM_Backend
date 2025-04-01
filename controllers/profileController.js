const { Conditions, Medications, Routines, FamilyHistories } = require('../models/profileModel');


// Create a new Condition
exports.createCondition = async (req, res) => {
    try {
        const { conditionsName, procedure } = req.body;
        const newCondition = new Conditions({ conditionsName, procedure });
        await newCondition.save();
        res.status(201).json({ success: true, data: newCondition });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Conditions
exports.getAllConditions = async (req, res) => {
    try {
        const conditions = await Conditions.find();
        res.status(200).json({ success: true, data: conditions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new Medication
exports.createMedication = async (req, res) => {
    try {
        const { medicationName, supplement } = req.body;
        const newMedication = new Medications({ medicationName, supplement });
        await newMedication.save();
        res.status(201).json({ success: true, data: newMedication });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Medications
exports.getAllMedications = async (req, res) => {
    try {
        const medications = await Medications.find();
        res.status(200).json({ success: true, data: medications });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new Routine
exports.createRoutine = async (req, res) => {
    try {
        const { routineName, allergy } = req.body;
        const newRoutine = new Routines({ routineName, allergy });
        await newRoutine.save();
        res.status(201).json({ success: true, data: newRoutine });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Routines
exports.getAllRoutines = async (req, res) => {
    try {
        const routines = await Routines.find();
        res.status(200).json({ success: true, data: routines });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Create a new Family History record
exports.createFamilyHistory = async (req, res) => {
    try {
        const { familyMemberName, visit } = req.body;
        const newFamilyHistory = new FamilyHistories({ familyMemberName, visit });
        await newFamilyHistory.save();
        res.status(201).json({ success: true, data: newFamilyHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Family Histories
exports.getAllFamilyHistories = async (req, res) => {
    try {
        const familyHistories = await FamilyHistories.find();
        res.status(200).json({ success: true, data: familyHistories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};