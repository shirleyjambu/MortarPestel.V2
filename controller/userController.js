const { validationResult } = require('express-validator/check');
var db = require("./../models");

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
                    let user = {
                      firstName : req.body.first_name,
                      lastName: req.body.last_name,
                      email : req.body.email,
                      password: req.body.password
                    };
              
                    db.User.create(user).then(function(dbUser) {
                      res.render("landing",{userCreated:'Successfully Created.Sign in'});
                    });  

            }else{
              console.log("Email already in use please sign in with the password associated with that account.");
              res.render("addUser",{layout:'guest',userExisting:'Email already in use please sign in with the password associated with that account.'});
            }
        }
      )
      // let user = {
      //   firstName : req.body.first_name,
      //   lastName: req.body.last_name,
      //   email : req.body.email,
      //   password: req.body.password
      // };

      // db.User.create(user).then(function(dbUser) {
      //   res.render("landing",{userCreated:'Successfully Created.Sign in'});
      // });    
    }
  },
  
  findByEmail: function (req, res) {
    db
      .User
      .findOne({
        attributes: ["id", "firstName", "lastName", "email", "password"],
        where: {
          email: req.params.email
        }/*,
        include: [db.Posts]*/
      })
      .then( (dbUsers) => {
          res.send(dbUsers);
        }
      )
      .catch((err) => {
        if(err){
          console.log(err);
          res.status(404).json(err);
        }
      });
  },
  getSessionUser:function(req,res){
    res.send(req.user);
  },

  shareRecipe: function (req, res){
    console.log(req.params.email);
    db
      .User
      .findOne({
        attributes: ["id", "firstName", "lastName", "email", "password"],
        where: {
          email: req.params.email
        } 
      })
      .then( (dbUsers) => {
        console.log("Found DB User");
          res.send(dbUsers);
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