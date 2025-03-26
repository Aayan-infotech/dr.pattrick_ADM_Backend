const User = require('../models/userModel');
const BasicProfile = require('../models/basicProfileModel');


// Get all profiles
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await BasicProfile.find().sort({ _id: -1 });
    const profileCount = profiles.length;
    res.status(200).json({ message: 'All Profiles', profileCount, profile: profiles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Profile By ProfileId
exports.getProfileById = async (req, res) => {
  try {
    const { profileId } = req.params;

    // Ensure the profileId is provided
    if (!profileId) {
      return res.status(400).json({ message: 'Profile ID is required' });
    }

    // Find the profile by ID
    const profile = await BasicProfile.findById(profileId).populate('user');

    // If profile not found
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile retrieved successfully', profile });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};