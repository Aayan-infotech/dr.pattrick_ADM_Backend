const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Route to get all users with search and pagination
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/toggle-status/:id', userController.toggleUserStatus);
router.delete('/users/:id', userController.deleteUser);
module.exports = router;
