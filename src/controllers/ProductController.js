
const ProductService = require('../services/ProductService');

async function getAll(req, res) {
  try {
    const products = await ProductService.getAll();
    res.json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}

async function create(req, res) {
  try {
    const product = await ProductService.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = { getAll, create };
