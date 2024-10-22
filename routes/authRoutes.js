const express = require('express');
const { signup, login, verifyOtp, resendOtp } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signup); // No email required at signup
router.post('/login', login);   // Email is required at login
router.post('/verify-otp', verifyOtp); // Verifies OTP sent to email
router.post('/resend-otp', resendOtp); // Resend OTP if needed

module.exports = router;
