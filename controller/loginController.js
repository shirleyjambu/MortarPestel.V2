const { validationResult } = require('express-validator/check');
const passport = require('./../utils/middleware/passport-local');


module.exports = {
  loginUser : (req, res, next) => {
    const errors = validationResult(req);

    const authMsg = req.flash('error');
    console.log('authMsg .... ' + authMsg);

    if(!errors.isEmpty()){
      res.render("landing",{errors:errors.array()});
    }else{
      /*const{err,user,messageObj} = passport.authenticate('local', {
        successRedirect: '/user/userlanding',
        failureRedirect: '/',
        failureFlash: true
      });
      console.log('---------Controller Message -----');
      console.log(messageObj.message);

      if(user){
        console.log('user there');
        
        
      }else{
        console.log('user not there');
        res.render("landing",{errors:errors.array()});
      }*/

      //res.render("userMain",{layout:'user'});
      next();
    }
    
  }
};
