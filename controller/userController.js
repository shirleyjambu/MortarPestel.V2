const { validationResult } = require('express-validator/check');
var db = require("./../models");

module.exports = {
  createUser : (req, res) => {
    console.log('............ CREATE USER .........');
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("addUser",{layout:'guest', errors:errors.array()});
    }else{
      
      let user = {
        firstName : req.body.first_name,
        lastName: req.body.last_name,
        email : req.body.email,
        password: req.body.password
      };

      db.User.create(user).then(function(dbUser) {
        res.render("landing",{userCreated:'Successfully Created.Sign in'});
      });    
    }
    
  }
};