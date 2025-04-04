const { Conditions, Medications, Routines, FamilyHistories } = require('../models/profileModel');


// Create a new Condition
exports.createCondition = async (req, res) => {
    try {
        const { conditionName, procedure } = req.body;

        if (!conditionName || !Array.isArray(procedure)) {
            return res.status(400).json({ success: false, message: "Invalid input format" });
        }

        const newCondition = new Conditions({ conditionName, procedure });
        await newCondition.save();

        res.status(201).json({ success: true, data: newCondition });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get all Conditions
exports.getAllConditions = async (req, res) => {
    try {
        const conditions = await Conditions.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: conditions });
    } catch (error) {
        console.error("Error in getAllConditions:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get Condition by ID
exports.getConditionById = async (req, res) => {
    try {
        const { id } = req.params;
        const condition = await Conditions.findById(id);

        if (!condition) {
            return res.status(404).json({ success: false, message: "Condition not found" });
        }

        res.status(200).json({ success: true, data: condition });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update Condition by ID
exports.updateConditionById = async (req, res) => {
    try {
        const { id } = req.params;
        const { conditionName, procedure } = req.body;

        const updated = await Conditions.findByIdAndUpdate(
            id,
            { conditionName, procedure },
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ success: false, message: "Condition not found" });
        }

        res.status(200).json({ success: true, data: updated });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete Condition by ID
exports.deleteConditionById = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Conditions.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ success: false, message: "Condition not found" });
        }

        res.status(200).json({ success: true, message: "Condition deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Create a new Medication
exports.createMedication = async (req, res) => {
    try {
        const { medicationName, supplement } = req.body;

        if (!medicationName || !Array.isArray(supplement)) {
            return res.status(400).json({ success: false, message: "Invalid input format" });
        }

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
        const medications = await Medications.find().sort({ createdAt: -1 });
        let conut = medications.length;
        res.status(200).json({ success: true, totalCount: conut, data: medications  });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a Medication by ID
exports.getMedicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const medication = await Medications.findById(id);
        if (!medication) {
            return res.status(404).json({ success: false, message: 'Medication not found' });
        }

        res.status(200).json({ success: true, data: medication });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a Medication by ID
exports.updateMedicationById = async (req, res) => {
    try {
        const { id } = req.params;
        const { medicationName, supplement } = req.body;

        if (!medicationName || !Array.isArray(supplement)) {
            return res.status(400).json({ success: false, message: "Invalid input format" });
        }

        const updatedMedication = await Medications.findByIdAndUpdate(
            id,
            { medicationName, supplement },
            { new: true, runValidators: true }
        );

        if (!updatedMedication) {
            return res.status(404).json({ success: false, message: 'Medication not found' });
        }

        res.status(200).json({ success: true, data: updatedMedication });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Medication by ID
exports.deleteMedicationById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMedication = await Medications.findByIdAndDelete(id);
        if (!deletedMedication) {
            return res.status(404).json({ success: false, message: 'Medication not found' });
        }

        res.status(200).json({ success: true, message: 'Medication deleted successfully' });
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
        const routines = await Routines.find().sort({ createdAt: -1 });
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
        const familyHistories = await FamilyHistories.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: familyHistories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};