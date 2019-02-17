const { validationResult } = require('express-validator/check');
const db = require("./../models");
const choices = {1:'Measurements',2:'Cuisine',3:'UserType'};

module.exports = {
  addItems : (req,res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      res.render("adminMain",{layout:'user', errors:errors.array()});
    }else{
      let adminChoice = req.body.adminChoice;
      console.log('............ CREATE ITEMS .........' + adminChoice);
      switch(adminChoice){
        case "1":
            // Add measurement
            let measurements = {
              measurement_name: req.body.item
            
            };
      
            db.Measurements.create(measurements).then(function(dbData) {
              res.render("adminMain",{layout:'user', itemCreated:'Measurement added in database'});
            });
            console.log("to Break");
        break;
        case "2":
        // Add cuisine
          let cuisine = {
            cuisine_name: req.body.item
          
          };
    
          db.Cuisine.create(cuisine).then(function(dbData) {
            res.render("adminMain",{layout:'user', itemCreated:'Cuisine added in database'});
          });
        break;
        case "3":
        //Alter usertype
        break;

      }
      
    }
  },
  getAllMeasurements :(req, res)=>{
    db.Measurements.findAll({})
    .then((dbData) => {
      //console.log(dbData);
      res.render("adminMain",{layout:'user', itemData:dbData});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  
  },
  getAllCuisines:(req, res)=>{
    db.Cuisine.findAll({})
    .then((dbData) => {
      //console.log(dbData);
      res.render("adminMain",{layout:'user', itemData:dbData});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  getAllCategory:(req, res)=>{
    db.Category.findAll({})
    .then((dbData) => {
      //console.log(dbData);
      res.render("adminMain",{layout:'user', itemData:dbData});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};