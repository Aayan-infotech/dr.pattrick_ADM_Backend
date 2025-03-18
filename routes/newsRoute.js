// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const upload = require('../middleware/upload');


router.post('/upload-image', newsController.uploadImage);
router.post('/',upload.single('thumbnail'), newsController.addContent);
router.get('/', newsController.getContents);
router.get('/get/:id', newsController.getNewsById);
router.put('/:id',upload.single('thumbnail'), newsController.updateContent);
router.post("/:newsId/comment/:userId", newsController.addComment);
router.get("/:newsId/comments", newsController.getComments);
router.delete('/:id', newsController.deleteContent);
router.delete('/:newsId/:commentId/delete', newsController.deleteComment);


module.exports = router;
