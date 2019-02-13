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
<<<<<<< HEAD
      // if (req.user)
=======
      //userController.findByEmail(req,res);
>>>>>>> 6266c7e749e12cd83be200cea24b3dde9c575add
      res.render("userMain",{layout:'user'});
    }*/
    
  }
};
