const bcrypt = require('bcrypt');
const User = require('../models/user.js');

const seedAdmin = async () => {
  const existingAdmin = await User.findOne({ username: process.env.DEFAULT_ADMIN_USERNAME });
  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(process.env.DEFAULT_ADMIN_PASSWORD, 10);
    await User.create({
      username: process.env.DEFAULT_ADMIN_USERNAME,
      password: hashedPassword,
      role: 'Admin',
      name: 'admin'
    });
    console.log('Default admin created.');
  } else {
    console.log('Admin already exists.');
  }
};

module.exports = seedAdmin;
