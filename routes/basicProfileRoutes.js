const express = require('express');
const basicProfileController = require('../controllers/basicProfileController');
const router = express.Router();

router.get('/all', basicProfileController.getAllProfiles);
router.get('/:profileId', basicProfileController.getProfileById);

module.exports = router;