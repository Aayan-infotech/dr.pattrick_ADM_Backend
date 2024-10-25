const User = require('../models/userModel');

// Get all users with search and pagination
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    // Pagination options
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
    };

    // Search condition
    const searchCondition = {
      $or: [
        { firstName: { $regex: search, $options: 'i' } }, // Case insensitive search on first name
        { lastName: { $regex: search, $options: 'i' } },  // Case insensitive search on last name
        { mobileNumber: { $regex: search, $options: 'i' } }, // Search on mobile number
        { email: { $regex: search, $options: 'i' } }       // Search on email
      ],
    };

    // Get paginated users with search
    const users = await User.find(searchCondition)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    // Get total count for pagination
    const totalUsers = await User.countDocuments(searchCondition);

    // Return response
    res.status(200).json({
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / options.limit),
      currentPage: options.page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return user details
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user by ID', error });
    }
  };

  exports.toggleUserStatus = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Find user by ID
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Toggle the isActive status
      user.isActive = !user.isActive;
  
      // Save updated user status
      await user.save();
  
      res.status(200).json({ message: `User ${user.isActive ? 'activated' : 'deactivated'} successfully`, user });
    } catch (error) {
      res.status(500).json({ message: 'Error toggling user status', error });
    }
  }

  exports.deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
      
        return res.status(200).json({ message: 'User Deleted',user });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error });
    }
}