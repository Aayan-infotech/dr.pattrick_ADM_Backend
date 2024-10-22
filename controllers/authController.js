const User = require('../models/userModel');
const nodemailer = require('nodemailer'); // for sending OTP via email
const crypto = require('crypto'); // for generating OTP
const jwt = require('jsonwebtoken');


// OTP generator
const generateOTP = () => Math.floor(1000 + Math.random() * 9000).toString();

// OTP expiry time (5 minutes)
const generateOtpExpiry = () => new Date(Date.now() + 5 * 60 * 1000);

// Email sending function
const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Example with Gmail
    auth: {
      user: 'ut.gupta29@gmail.com',
      pass: 'yver vjuu fvbb hcot',
    },
  });

  const mailOptions = {
    from: 'ut.gupta29@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It expires in 5 minutes.`,
  };

  return transporter.sendMail(mailOptions);
};

// Signup
exports.signup = async (req, res) => {
  const { firstName, lastName, mobileNumber, email, referredBy } = req.body;

  try {
    // Check if the mobile number or email already exists
    const existingUserByMobile = await User.findOne({ mobileNumber });
    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByMobile) {
      return res.status(400).json({ message: 'Mobile number already exists' });
    }
    
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new user with email at signup
    const newUser = new User({
      firstName,
      lastName,
      mobileNumber,
      email, // Email is now being captured at signup
      referredBy,
      otp: null, // OTP will be generated at login time
      otpExpiry: null // OTP expiry will be handled during login
    });

    await newUser.save(); // Save the new user in the database

    res.status(201).json({ message: 'User created successfully, please login with email' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


  
  // Login
 

  exports.login = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the user exists by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Email not found, please sign up first' });
      }
  
      // Generate a 4-digit OTP and its expiry time
      const otp = generateOTP(); // Function to generate the OTP
      const otpExpiry = generateOtpExpiry(); // Function to generate the OTP expiry time
  
      // Save OTP and expiry in the user’s document
      user.otp = otp;
      user.otpExpiry = otpExpiry;
  
      await user.save(); // Save the updated user document
  
      // Send OTP to the email
      await sendOtpEmail(email, otp); // Function to send OTP via nodemailer
  
      // Respond with success
      res.status(200).json({ message: 'OTP sent to the provided email' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  
  
  

  // Verify OTP
  exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
  
    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Check if the OTP is correct and has not expired
      const currentTime = Date.now();
      if (user.otp !== otp || currentTime > user.otpExpiry) {
        return res.status(400).json({ message: 'Invalid or expired OTP' });
      }
  
      // OTP is valid, clear the OTP fields (for security)
      user.otp = null;
      user.otpExpiry = null;
      await user.save();
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Secret key from environment variables
        { expiresIn: '1h' } // Token valid for 1 hour
      );
  
      // Respond with the token and a success message
      res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

  // Resend OTP
exports.resendOtp = async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Email not found' });
  
      const otp = generateOTP();
      const otpExpiry = generateOtpExpiry();
  
      user.otp = otp;
      user.otpExpiry = otpExpiry;
  
      await user.save();
  
      // Send OTP to user's email
      await sendOtpEmail(email, otp);
  
      res.status(200).json({ message: 'OTP resent to the provided email' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  