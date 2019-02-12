const { validationResult } = require('express-validator/check');
const userController = require('./userController');

module.exports = {
  loginUser : (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("landing",{errors:errors.array()});
    }else{
      userController.findByEmail(req,res);
      //res.render("userMain",{layout:'user'});
    }
    
  }
};
