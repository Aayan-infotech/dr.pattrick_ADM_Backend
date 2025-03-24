const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/create', categoryController.createCategoryWithSubcategories);
router.get('/', categoryController.getAllCategories);
router.get('/:categoryId', categoryController.getCategoryById);
router.put('/:categoryId', categoryController.updateCategoryWithSubcategories);
router.delete('/:Id', categoryController.deleteCategory);


module.exports = router;
