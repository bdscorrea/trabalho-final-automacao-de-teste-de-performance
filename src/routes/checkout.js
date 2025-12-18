const express = require('express');
const CheckoutController = require('../controllers/CheckoutController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// POST /checkout - requires authentication
router.post('/', authenticateToken, CheckoutController.checkout);

module.exports = router;
