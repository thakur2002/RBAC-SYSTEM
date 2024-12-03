const Role = require('../models/roles');


   function authorizeRole(reqpermission){
    return async (req, res, next) => {
        try{
        const roledata=await Role.findOne({role: req.user.role});
        const grantedpermissions=roledata.permissions;
      if (!grantedpermissions.includes(reqpermission)) {
        return res.status(403).json({ error: 'Access denied.' });
      }
      next();
    }
    catch(e){
        res.status(500).json({ message: 'Internal server error', error: e.message });
    }
    };
  };
  module.exports=authorizeRole;