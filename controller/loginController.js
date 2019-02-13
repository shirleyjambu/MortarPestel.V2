const { validationResult } = require('express-validator/check');

module.exports = {
  loginUser : (req, res, next) => {
    console.log('------------ in Login User ---------');
   
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("landing",{errors:errors.array()});
    }else{
      //res.render("userMain",{layout:'user'});
      next();
    }
    
  }
};
