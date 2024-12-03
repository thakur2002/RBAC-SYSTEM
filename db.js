const mongoose=require('mongoose');
require('dotenv').config();
const seedAdmin = require('./seed/seedadmin.js');
const seedRoles=require('./seed/seedroles.js');
  async  function connectdb(){
    const mongouri=process.env.dbconnectionstring;
    mongoose
  .connect(mongouri)
  .then(async () => {
    console.log('Database connected');
    await seedRoles();
    await seedAdmin(); // Seed the default admin
    
  })
  .catch((err) => console.error('Database connection failed:', err));
  }

  module.exports=connectdb;
