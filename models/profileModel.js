const mongoose = require('mongoose');

// Section 1

// Use as subcategories
const ProcedureSchema = new mongoose.Schema({
    procedureName: { type: String, required: true },
});

// Use as category
const ConditionsSchema = new mongoose.Schema({
    conditionsName: { type: String, required: true },
    procedure: [ProcedureSchema],
});


// Section 2

// Use as subcategories
const SupplementSchema = new mongoose.Schema({
    supplementsName: { type: String, required: true },
});

// Use as Category
const MedicationSchema = new mongoose.Schema({
    medicationName: { type: String, required: true },
    supplement: [SupplementSchema],
});


// Section 3

// subcategories 
const AllergySchema = new mongoose.Schema({
    allergyName: { type: String, required: true },
})

// Categories
const RoutineSchema = new mongoose.Schema({
    routineName: { type: String, required: true },
    allergy: [AllergySchema],
});


// Section 4

// subcategories 
const VisitSchema = new mongoose.Schema({
    visitDate: { type: String, required: true },
})

// Categories
const FamilyHistorySchema = new mongoose.Schema({
    familyMemberName: { type: String, required: true },
    visit: [VisitSchema],
});


module.exports = {
    Conditions: mongoose.model('Conditions', ConditionsSchema),
    Medications: mongoose.model('Medications', MedicationSchema),
    Routines: mongoose.model('Routines', RoutineSchema),
    FamilyHistories: mongoose.model('FamilyHistories', FamilyHistorySchema),
};












// const mongoose = require('mongoose');

// // Subcategory: Family Member Visit
// const FamilyMemberVisitSchema = new mongoose.Schema({
//     visitDate: { type: Date, required: true }
// });

// // Subcategory: Family Member
// const FamilyMemberSchema = new mongoose.Schema({
//     familyMemberName: { type: String, required: true },
//     visits: [FamilyMemberVisitSchema] // Each family member has multiple visits
// });

// // Subcategory: Allergy
// const AllergySchema = new mongoose.Schema({
//     allergyName: { type: String, required: true },
//     familyMember: [FamilyMemberSchema] // Allergies are linked to family members
// });

// // Subcategory: Routine
// const RoutineSchema = new mongoose.Schema({
//     routineName: { type: String, required: true },
//     allergies: [AllergySchema] // Routine can have associated allergies
// });

// // Subcategory: Supplement
// const SupplementSchema = new mongoose.Schema({
//     supplementsName: { type: String, required: true },
//     routine: [RoutineSchema] // Supplements follow a routine
// });

// // Subcategory: Medication
// const MedicationSchema = new mongoose.Schema({
//     medicationName: { type: String, required: true },
//     supplements: [SupplementSchema] // Each medication can have multiple supplements
// });

// // Subcategory: Procedure
// const ProcedureSchema = new mongoose.Schema({
//     procedureName: { type: String, required: true },
//     medications: [MedicationSchema] // Each procedure can have multiple medications
// });

// // Main Category: Conditions
// const ConditionsSchema = new mongoose.Schema({
//     conditionsName: { type: String, required: true },
//     procedures: [ProcedureSchema] // A condition can have multiple procedures
// });

// // Export the model
// const Conditions = mongoose.model('Conditions', ConditionsSchema);
// module.exports = Conditions;
