const mongoose = require('mongoose');

const defaultImage = {
  filename: 'default-image.jpg',
  contentType: 'image/png',
  url: 'https://drpatbucket.s3.us-east-1.amazonaws.com/1729766657291-Profile_avatar_placeholder_large.png'
};

const imageSchema1 = new mongoose.Schema({
  filename: { type: String, required: true },
  contentType: { type: String, required: true },
  url: { type: String, required: true }
});


const userSchema = new mongoose.Schema(
  {
    
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    mobileNumber: { type: String, required: true, unique: true },
    email: { type: String, unique: true, required: true },
    referredBy: { type: String, default: null },
    basicProfile: { type: mongoose.Schema.Types.ObjectId, ref: 'BasicProfile' },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
    isActive: { type: Boolean, default: false },
    profileImage: {
      type: [imageSchema1],
      default: [defaultImage]
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
