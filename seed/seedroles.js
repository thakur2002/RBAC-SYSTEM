const Role = require('../models/roles');

const seedRoles = async () => {
  const defaultRoles = [
    {
      role: 'Admin',
      permissions: ['getAllUsers', 'updateRole', 'deleteUser', 'getOwnProfile','UpdateOwnProfile'],
    },
    {
      role: 'Moderator',
      permissions: ['getAllUsers', 'getOwnProfile', 'UpdateOwnProfile'],
    },
    {
      role: 'User',
      permissions: ['getOwnProfile', 'updateOwnProfile'],
    },
  ];

  for (const role of defaultRoles) {
    const exists = await Role.findOne({ role: role.role });
    if (!exists) {
      await Role.create(role);
    }
  }
  console.log('Default roles and permissions seeded.');
};

module.exports = seedRoles;
