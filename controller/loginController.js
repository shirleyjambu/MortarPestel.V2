const { validationResult } = require('express-validator/check');
const userController = require('./userController');

module.exports = {
  loginUser : (req, res) => {
    console.log('------------ in Login User ---------');
    res.render("userMain",{layout:'user'});
    /*const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("landing",{errors:errors.array()});
    }else{
      // if (req.user)
      //userController.findByEmail(req,res);
      res.render("userMain",{layout:'user'});
    }*/
    
  }
};
