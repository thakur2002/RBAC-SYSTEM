const express = require('express');
const authenticate = require('../middlewares/auth');
const authorizeRole=require('../middlewares/authorizerole');
const {getallusers,deleteuser,updaterole,getmyprofile,updatemyprofile}= require('../controllers/usercontroller')
const router = express.Router();

// Get profile
router.get('/profile', authenticate, getmyprofile);

// Update profile (excluding role)
router.put('/profile', authenticate, updatemyprofile);

// Get all users
router.get('/users', authenticate, authorizeRole(['getAllUsers']),getallusers);
  
  // Update a user's role
  router.put('/users/:username/:role', authenticate, authorizeRole(['updateRole']), updaterole);
  
  // Delete a user
  router.delete('/users/:username', authenticate, authorizeRole(['deleteUser']), deleteuser);

module.exports = router;
