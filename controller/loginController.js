const { validationResult } = require('express-validator/check');

module.exports = {
  loginUser : (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("landing",{errors:errors.array()});
    }else{
      res.render("userMain",{layout:'user'});
    }
    
  }
};
