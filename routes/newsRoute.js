// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const upload = require('../middleware/upload');


router.post('/upload-image', newsController.uploadImage);
router.get('/get/:id', newsController.getNewsById);
router.get('/', newsController.getContents);
router.post('/',upload.single('thumbnail'), newsController.addContent);
router.put('/:id',upload.single('thumbnail'), newsController.updateContent);
router.delete('/:id', newsController.deleteContent);
router.post("/:newsId/comment/:userId", newsController.addComment);


module.exports = router;
