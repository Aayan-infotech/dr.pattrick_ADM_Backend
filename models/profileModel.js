const mongoose = require('mongoose');

// Use as subcategories
const ProcedureSchema = new mongoose.Schema(
    {
        procedureName: { type: String, require: true }
    }
);

const ConditionsSchema = new mongoose.Schema(
    {
        conditionsName: { type: String, require: true },
        procedure: [ProcedureSchema],
    }
);

module.exports = mongoose.model('Conditions', ConditionsSchema );