const bcrypt = require('bcryptjs');

class User {
  constructor(id, email, password, name) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.createdAt = new Date();
  }

  // Hash password before creating user
  static async createUser(id, email, password, name) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new User(id, email, hashedPassword, name);
  }

  // Verify password
  async verifyPassword(password) {
    return bcrypt.compare(password, this.password);
  }

  // Convert to JSON (exclude password)
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt
    };
  }
}

// In-memory storage for users
const users = [];

// Initialize with 3 default users
const initializeUsers = async () => {
  if (users.length === 0) {
    users.push(await User.createUser(1, 'john@example.com', 'password123', 'John Doe'));
    users.push(await User.createUser(2, 'jane@example.com', 'password456', 'Jane Smith'));
    users.push(await User.createUser(3, 'bob@example.com', 'password789', 'Bob Johnson'));
  }
};

// Initialize users when module is loaded
initializeUsers();

module.exports = {
  User,
  users
};
