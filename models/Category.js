const mongoose = require('mongoose');

// Use as Subcategories
const ConditionsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, }
  }
);

// Use as Categories
const SystemsSchema = new mongoose.Schema(
  {
    systems: { type: String, required: true, },
    conditions: [ConditionsSchema],
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Category', SystemsSchema);
