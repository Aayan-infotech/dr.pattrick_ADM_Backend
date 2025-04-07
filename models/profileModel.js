const mongoose = require('mongoose');

// Section 1

// Use as subcategories
const ProcedureSchema = new mongoose.Schema({
    procedureName: { type: String, required: true },
});

// Use as category
const ConditionSchema = new mongoose.Schema({
    conditionName: { type: String, required: true },
    procedure: [ProcedureSchema],
}, { timestamps: true }
);


// Section 2

// Use as subcategories
const SupplementSchema = new mongoose.Schema({
    supplementsName: { type: String, required: true },
});

// Use as Category
const MedicationSchema = new mongoose.Schema({
    medicationName: { type: String, required: true },
    supplement: [SupplementSchema],
}, { timestamps: true }
);


// Section 3

// subcategories 
const AllergySchema = new mongoose.Schema({
    allergyName: { type: String, required: true },
})

// Categories
const RoutineSchema = new mongoose.Schema({
    routineName: { type: String, required: true },
    allergy: [AllergySchema],
}, { timestamps: true }
);


// Section 4

// Categories
const FamilyHistorySchema = new mongoose.Schema({
    familyMemberConditionName: { type: String, required: true },
}, { timestamps: true }
);


module.exports = {
    Conditions: mongoose.model('Conditions', ConditionSchema),
    Medications: mongoose.model('Medications', MedicationSchema),
    Routines: mongoose.model('Routines', RoutineSchema),
    FamilyHistories: mongoose.model('FamilyHistories', FamilyHistorySchema),
};