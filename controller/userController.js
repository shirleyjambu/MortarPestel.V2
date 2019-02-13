const { validationResult } = require('express-validator/check');
var db = require("./../models");
const passport = require("./../utils/middleware/passport");

const emptyObj =(obj) => {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

module.exports = {
  createUser : (req, res) => {
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
  },
  findByEmail: function (req, res) {
    db
      .User
      .findOne({
        attributes: ["id", "firstName", "lastName", "email", "password"],
        where: {
          email: req.body.email
        }/*,
        include: [db.Posts]*/
      })
      .then( (dbUsers) => {
            if(emptyObj(dbUsers)){
                    // No user found
              console.log("User is not found in the DB");
              res.render("landing",{userNotFound:'User Not Found'});
            }else{
              // authenticate
            console.log("User has to be authenticated");
            res.redirect("/user/userlanding");
            }
        }
      )
      .catch((err) => {
        if(err){
          console.log(err);
          res.status(404).json(err);
        }

        
        
      });
  }
};