const {
  validationResult
} = require('express-validator/check');
var db = require("./../models");

module.exports = {
  addRecipe: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("addRecipe", {
        layout: 'user',
        errors: errors.array()
      });
    } else {
      let recipe = req.body;
      db.Recipe.create(recipe).then(function (dbRecipe) {
        res.send("userRecipes");
      });
    }
  },
  getAllRecipes : (req, res) => {
    console.log("IN GETTing all recipes");
     db.Recipe.findAll({})
      .then((dbRecipes) => {
        //console.log(dbRecipes);
        res.render("userRecipes",{layout:'user', recipeData:dbRecipes});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    
  }
};