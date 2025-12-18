const Product = require('../models/Product');

class ProductService {
  async getAll() {
    // Replace with DB query in real app
    return Product.findAll ? await Product.findAll() : [];
  }

  async create(data) {
    // Basic validation
    if (!data.name || !data.price || !data.stock) {
      throw new Error('Missing required fields: name, price, stock');
    }
    // Replace with DB insert in real app
    return Product.create ? await Product.create(data) : data;
  }
}

module.exports = new ProductService();
