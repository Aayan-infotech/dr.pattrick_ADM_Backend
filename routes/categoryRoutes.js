const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Route to create a new category with subcategories
router.post('/create', categoryController.createCategoryWithSubcategories);

// Route to get all categories and their subcategories
router.get('/', categoryController.getAllCategories);

// Update a category and its subcategories
router.put('/:categoryId', categoryController.updateCategoryWithSubcategories);

// Delete a category and its subcategories
router.delete('/:Id', categoryController.deleteCategory);
module.exports = router;
