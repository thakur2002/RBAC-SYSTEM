const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true},
  permissions: { type: [String], required: true},
});

module.exports = mongoose.model('rbacRole', rolesSchema);
