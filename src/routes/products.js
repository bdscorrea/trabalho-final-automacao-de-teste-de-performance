const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const ProductController = require('../controllers/ProductController');

// GET /products - list all products (auth required)
router.get('/', authenticateToken, ProductController.getAll);

// POST /products - create a product (auth required)
router.post('/', authenticateToken, ProductController.create);

module.exports = router;
