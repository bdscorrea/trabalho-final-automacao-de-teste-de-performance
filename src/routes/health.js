const express = require('express');
const HealthController = require('../controllers/HealthController');

const router = express.Router();

// GET /health
router.get('/', HealthController.health);

module.exports = router;
