const jwt = require('jsonwebtoken');
const { User, users } = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

class UserService {
  // Find user by email
  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  // Find user by ID
  static findById(id) {
    return users.find(user => user.id === id);
  }

  // Register new user
  static async register(email, password, name) {
    // Check if user already exists
    const existingUser = this.findByEmail(email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate new ID
    const newId = Math.max(...users.map(u => u.id), 0) + 1;

    // Create new user
    const newUser = await User.createUser(newId, email, password, name);
    users.push(newUser);

    return newUser;
  }

  // Login user
  static async login(email, password) {
    const user = this.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return {
      token,
      user: user.toJSON()
    };
  }
}

module.exports = UserService;
