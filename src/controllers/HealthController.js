const { users } = require('../models/User');
const { products } = require('../models/Product');

class HealthController {
  // GET /health
  static async health(req, res) {
    try {
      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        environment: process.env.NODE_ENV || 'development',
        data: {
          totalUsers: users.length,
          totalProducts: products.length
        }
      };

      res.json({
        success: true,
        message: 'API is healthy',
        data: healthStatus
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Health check failed',
        error: error.message
      });
    }
  }
}

module.exports = HealthController;
