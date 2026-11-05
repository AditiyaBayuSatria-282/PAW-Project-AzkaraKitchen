const express = require('express');
const router = express.Router();
const webController = require('../controllers/webController');

router.get('/', webController.renderHome);

module.exports = router;