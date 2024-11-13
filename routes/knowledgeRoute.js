// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');
const upload = require('../middleware/upload');


router.post('/upload-image', knowledgeController.uploadImage);
router.get('/', knowledgeController.getContents);
router.post('/',upload.single('thumbnail'), knowledgeController.addContent);
router.put('/:id',upload.single('thumbnail'), knowledgeController.updateContent);
router.delete('/:id', knowledgeController.deleteContent);
router.get('/:id', knowledgeController.getKnowledgeById);
module.exports = router;
