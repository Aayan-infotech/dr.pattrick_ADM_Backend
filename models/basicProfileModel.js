const mongoose = require('mongoose');

const basicProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    DOB: { type: String, required: true },
    ethnicity: { type: String, default: null },
    race: { type: String, default: null },
    genderIdentidy: { type: String, default: null },
    sexGenetic: { type: String, default: null },
    categories: [
      {
        systems: { type: String, required: false },
        conditions: [{ type: String, required: false }]
      }
    ],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: false }  // [longitude, latitude]
    },
    miles: { type: Number, required: false },
    zipCode: { type: String, required: false }
  }
);

// Create a geospatial index for efficient location-based queries (e.g., finding nearby users, searching within an area)
basicProfileSchema.index({ location: '2dsphere' });

const Profile = mongoose.model('BasicProfile', basicProfileSchema);
module.exports = Profile;