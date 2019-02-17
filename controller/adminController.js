const {
  validationResult
} = require('express-validator/check');
const db = require("./../models");
const choices = {
  1: 'Measurements',
  2: 'Cuisine',
  3: 'UserType'
};

module.exports = {
  addItems: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("adminMain", {
        layout: 'user',
        errors: errors.array()
      });
    } else {
      let adminChoice = req.body.adminChoice;
     
      switch (adminChoice) {
        case "1":
          // Add measurement
          let measurements = {
            measurement_name: req.body.item
          };

          db.Measurements.create(measurements).then(function (dbData) {
            res.render("adminMain", {
              layout: 'user',
              itemCreated: 'Measurement added in database'
            });
          });
         
          break;

        case "2":
          // Add cuisine
          let cuisine = {
            cuisine_name: req.body.item
          };

          db.Cuisines.create(cuisine).then(function (dbData) {
            res.render("adminMain", {
              layout: 'user',
              itemCreated: 'Cuisine added in database'
            });
          });
          
          break;
          

        case "3":
          //Add category

          let category = {
            categories_name: req.body.item
          };
          

          db.Category.create(category).then(function (dbData) {
            res.render("adminMain", {
              layout: 'user',
              itemCreated: 'Category added in database'
            });
          });
          
          break;

          case "4":
          //Edit user

          let user = {
            firstName : req.body.first_name,
            lastName: req.body.last_name,
            email : req.body.email,
            password: req.body.password
          };

          db.User.create(user).then(function(dbUser) {
            res.render("adminMain",{
              layout: 'user',
              itemCreated: 'User has been updated in the database'
            });
          });
                 
          break;

      }

    }
  },
  getAllMeasurements: (req, res) => {
    db.Measurements.findAll({})
      .then((dbData) => {
        res.send(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });

  },
  getAllCuisines: (req, res) => {
    db.Cuisines.findAll({})
      .then((dbData) => {
        res.send(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getAllCategory: (req, res) => {
    db.Category.findAll({})
      .then((dbData) => {
        res.send(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getAllUser: (req, res) => {
    db.User.findAll({})
      .then((dbData) => {
        res.send(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }

};