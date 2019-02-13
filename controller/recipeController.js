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

      let recipe = {
        recipe_name: req.body.recipe_name,
        recipe_instruction: req.body.recipe_instruction
      };

      db.Recipe.create(recipe).then(function (dbRecipe) {
        res.render("userRecipes",{layout:'user'});
      });
    }
  }
};