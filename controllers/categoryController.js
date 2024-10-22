const Category = require('../models/Category');

// Create a new category with subcategories
exports.createCategoryWithSubcategories = async (req, res) => {
  try {
      const { name, subcategories } = req.body;

      // Validate input
      if (!name) {
          return res.status(400).json({ message: 'Category name is required' });
      }

      if (!subcategories || !Array.isArray(subcategories)) {
          return res.status(400).json({ message: 'Subcategories must be an array' });
      }

      // Create the category with subcategories
      const category = new Category({
          name,
          subcategories: subcategories.map(sub => ({ name: sub }))
      });

      await category.save();
      res.status(201).json({ message: 'Category and subcategories created successfully', category });
  } catch (error) {
      res.status(500).json({ message: 'Error creating category with subcategories', error });
  }
};


// Get all categories with subcategories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Update a category and its subcategories
exports.updateCategoryWithSubcategories = async (req, res) => {
  try {
      const { categoryId } = req.params;
      const { name, subcategories } = req.body;

      // Validate input
      if (!name) {
          return res.status(400).json({ message: 'Category name is required' });
      }
      if (!subcategories || !Array.isArray(subcategories)) {
          return res.status(400).json({ message: 'Subcategories must be an array' });
      }

      // Find and update the category
      const category = await Category.findById(categoryId);
      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      // Update the category name and subcategories
      category.name = name;
      category.subcategories = subcategories.map(sub => ({ name: sub }));
      await category.save();

      res.status(200).json({ message: 'Category and subcategories updated successfully', category });
  } catch (error) {
      res.status(500).json({ message: 'Error updating category with subcategories', error });
  }
};

// Delete a category and its subcategories
exports.deleteCategory = async (req, res) => {
  try {
      const { Id } = req.params;

      // Find and delete the category
      const category = await Category.findByIdAndDelete(Id);
      if (!category) {
          return res.status(404).json({ message: 'Category not found' });
      }

      res.status(200).json({ message: 'Category and its subcategories deleted successfully' });
  } catch (error) {
      res.status(500).json({ message: 'Error deleting category', error });
  }
};
