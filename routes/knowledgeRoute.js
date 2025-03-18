// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const knowledgeController = require('../controllers/knowledgeController');
const upload = require('../middleware/upload');


router.post('/upload-image', knowledgeController.uploadImage);
router.post('/',upload.single('thumbnail'), knowledgeController.addContent);
router.get('/', knowledgeController.getContents);
router.get('/:id', knowledgeController.getKnowledgeById);
router.put('/:id',upload.single('thumbnail'), knowledgeController.updateContent);
router.post('/:knowledgeId/comment/:userId', knowledgeController.addComment);
router.get('/:knowledgeId/comments', knowledgeController.getComments);
router.delete('/:id', knowledgeController.deleteContent);
router.delete('/:knowledgeId/:commentId/delete', knowledgeController.deleteComment);

module.exports = router;
