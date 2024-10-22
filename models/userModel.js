const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  mobileNumber: { type: String, required: true, unique: true },
  email: { type: String, unique: true, required: true },
  referredBy: { type: String, default: null },
  otp: { type: String, default: null },
  otpExpiry: { type: Date, default: null },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
