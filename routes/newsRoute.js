// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

router.post('/upload-image', newsController.uploadImage);
router.get('/', newsController.getContents);
router.post('/', newsController.addContent);
router.put('/:id', newsController.updateContent);
router.delete('/:id', newsController.deleteContent);
router.get('/:id', newsController.getNewsById);
module.exports = router;
