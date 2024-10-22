
const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting token as 'Bearer TOKEN'
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = verified; // Set user info for the next middleware or request handler
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;
