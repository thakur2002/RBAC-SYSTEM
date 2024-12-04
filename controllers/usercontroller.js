
const User = require('../models/user');
const Role=require('../models/roles');

let rolesarray=[];
async function fillavailableroles(){
  const rolesdata=await Role.find();
  rolesarray=rolesdata.map(role=>role.role);
}

// Get profile
const getmyprofile=async (req, res) => {
  try{
  const user = await User.findById(req.user.id).select('-password');
  res.status(200).json(user);
  }
  catch(e){
    return res.status(500).json({message:"Internal Server error", error:e.message});
  }
};

// Update profile (excluding role)
const updatemyprofile=async (req, res) => {
    
  try{
    
    const { role,_id,username,password,...updateData } = req.body;

    // Check if updateData is empty after removing the role field
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { ...updateData },
      { new: true }
    ).select('-password');
    res.status(200).json(updatedUser);
  }
  catch(e){
    return res.status(500).json({message:"Internal Server error", error:e.message});
  }
};

// Get all users
const getallusers=async (req, res) => {
    try{
      const users = await User.find().select('-password');
      res.status(200).json(users);
    }
   catch(e){
    return res.status(500).json({message:"Internal Server error", error:e.message});
   }
  };
  
  // Update a user's role
  const updaterole=async (req, res) => {
    let {username,role}=req.params;
    username=username.charAt(0).toUpperCase()+username.slice(1);
    let user=await User.findOne({username});
    if(!user){
        return res.status(404).json({error:"user not found"});
      }
    if(user.role=='Admin'){
      return res.status(400).json({message: "You cannot update the role of another admin"});
    }
    role=role.charAt(0).toUpperCase()+role.slice(1);
    await fillavailableroles();
    if (!rolesarray.includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    try{
      user = await User.findOneAndUpdate({username}, { role }, { new: true }).select('-password');
     
      res.status(200).json(user);
    }
    catch(e){
      return res.status(500).json({message:"Internal Server error", error:e.message});
    }
  };
  
  // Delete a user
 const deleteuser=async (req, res) => {
    let {username}=req.params;
    username=username.charAt(0).toUpperCase()+username.slice(1);
    const user=await User.findOne({username});
    if(!user){
      return res.status(404).json({error:"user not found"});
    }
    if(user.role=='Admin'){
      return res.status(400).json({message: "You cannot delete another admin"});
    }
    try{
      await User.deleteOne({username});
      res.json({ message: 'User deleted successfully.' });
    }
    catch(e){
      return res.status(500).json({message:"Internal Server error", error:e.message});
    }
  };

module.exports = {getallusers,deleteuser,updaterole,getmyprofile,updatemyprofile};
