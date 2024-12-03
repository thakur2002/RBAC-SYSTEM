const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Moderator', 'User'], default: 'User' },
  name: { type: String, default: 'New User' },
  email: { type: String, default: 'not_provided@something.com' },
  age: { type: Number, default: 0 },
  experience: { type: Number, default: 0 },
});

module.exports = mongoose.model('rbacUser', userSchema);
