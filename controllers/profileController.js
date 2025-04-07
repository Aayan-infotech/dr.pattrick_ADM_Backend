const { Conditions, Medications, Routines, FamilyHistories } = require('../models/profileModel');

// Conditions & Procedures Section

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

// Medications & Supplements Section

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
        res.status(200).json({ success: true, totalCount: conut, data: medications });
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

// Routines & Allergies Section

// Create a new Routine
exports.createRoutine = async (req, res) => {
    try {
        const { routineName, allergy } = req.body;

        if (!routineName || !Array.isArray(allergy)) {
            return res.status(400).json({ success: false, message: "Invalid input format" });
        }

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
        const count = routines.length;
        res.status(200).json({ success: true, totalCount: count, data: routines });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a Routine by ID
exports.getRoutineById = async (req, res) => {
    try {
        const { id } = req.params;

        const routine = await Routines.findById(id);
        if (!routine) {
            return res.status(404).json({ success: false, message: 'Routine not found' });
        }

        res.status(200).json({ success: true, data: routine });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a Routine by ID
exports.updateRoutineById = async (req, res) => {
    try {
        const { id } = req.params;
        const { routineName, allergy } = req.body;

        if (!routineName || !Array.isArray(allergy)) {
            return res.status(400).json({ success: false, message: "Invalid input format" });
        }

        const updatedRoutine = await Routines.findByIdAndUpdate(
            id,
            { routineName, allergy },
            { new: true, runValidators: true }
        );

        if (!updatedRoutine) {
            return res.status(404).json({ success: false, message: 'Routine not found' });
        }

        res.status(200).json({ success: true, data: updatedRoutine });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Routine by ID
exports.deleteRoutineById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRoutine = await Routines.findByIdAndDelete(id);
        if (!deletedRoutine) {
            return res.status(404).json({ success: false, message: 'Routine not found' });
        }

        res.status(200).json({ success: true, message: 'Routine deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Family-Member-History & Visite Section

// Create a new Family History record
exports.createFamilyHistory = async (req, res) => {
    try {
        const { familyMemberConditionName } = req.body;

        if (!familyMemberConditionName) {
            return res.status(400).json({ success: false, message: "Condition name is required" });
        }

        const newFamilyHistory = new FamilyHistories({ familyMemberConditionName });
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
        const count = familyHistories.length;
        res.status(200).json({ success: true, totalCount: count, data: familyHistories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get a Family History by ID
exports.getFamilyHistoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const history = await FamilyHistories.findById(id);
        if (!history) {
            return res.status(404).json({ success: false, message: 'Family history not found' });
        }

        res.status(200).json({ success: true, data: history });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a Family History by ID
exports.updateFamilyHistoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const { familyMemberConditionName } = req.body;

        if (!familyMemberConditionName) {
            return res.status(400).json({ success: false, message: "Condition name is required" });
        }

        const updatedHistory = await FamilyHistories.findByIdAndUpdate(
            id,
            { familyMemberConditionName },
            { new: true, runValidators: true }
        );

        if (!updatedHistory) {
            return res.status(404).json({ success: false, message: 'Family history not found' });
        }

        res.status(200).json({ success: true, data: updatedHistory });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Delete a Family History by ID
exports.deleteFamilyHistoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedHistory = await FamilyHistories.findByIdAndDelete(id);
        if (!deletedHistory) {
            return res.status(404).json({ success: false, message: 'Family history not found' });
        }

        res.status(200).json({ success: true, message: 'Family history deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};