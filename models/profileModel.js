// const mongoose = require('mongoose');

// // Section 1

// // Use as subcategories
// const ProcedureSchema = new mongoose.Schema({
//         procedureName: { type: String, require: true }
// });

// // Use as category
// const ConditionsSchema = new mongoose.Schema({
//         conditionsName: { type: String, require: true },
//         procedure: [ProcedureSchema],
// });



// // Section 2

// // Use as subcategories
// const supplementSchema = new mongoose.Schema(
//     {
//         supplementsName: { type: String, require: true }
//     }
// );

// // Use as Category
// const MedicationSchema = new mongoose.model(
//     {
//         medicationName: { type: String, require: true },
//         supplement: [supplementSchema],
//     }
// ); 

// module.exports = mongoose.model('Conditions', ConditionsSchema );
// mudule.exports = mongoose.model('Medications', MedicationSchema)













const mongoose = require('mongoose');

// Subcategory: Family Member Visit
const FamilyMemberVisitSchema = new mongoose.Schema({
    visitDate: { type: Date, required: true }
});

// Subcategory: Family Member
const FamilyMemberSchema = new mongoose.Schema({
    familyMemberName: { type: String, required: true },
    visits: [FamilyMemberVisitSchema] // Each family member has multiple visits
});

// Subcategory: Allergy
const AllergySchema = new mongoose.Schema({
    allergyName: { type: String, required: true },
    familyMember: [FamilyMemberSchema] // Allergies are linked to family members
});

// Subcategory: Routine
const RoutineSchema = new mongoose.Schema({
    routineName: { type: String, required: true },
    allergies: [AllergySchema] // Routine can have associated allergies
});

// Subcategory: Supplement
const SupplementSchema = new mongoose.Schema({
    supplementsName: { type: String, required: true },
    routine: [RoutineSchema] // Supplements follow a routine
});

// Subcategory: Medication
const MedicationSchema = new mongoose.Schema({
    medicationName: { type: String, required: true },
    supplements: [SupplementSchema] // Each medication can have multiple supplements
});

// Subcategory: Procedure
const ProcedureSchema = new mongoose.Schema({
    procedureName: { type: String, required: true },
    medications: [MedicationSchema] // Each procedure can have multiple medications
});

// Main Category: Conditions
const ConditionsSchema = new mongoose.Schema({
    conditionsName: { type: String, required: true },
    procedures: [ProcedureSchema] // A condition can have multiple procedures
});

// Export the model
const Conditions = mongoose.model('Conditions', ConditionsSchema);
module.exports = Conditions;
