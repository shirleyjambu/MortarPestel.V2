const {
  validationResult
} = require('express-validator/check');
var db = require("./../models");

module.exports = {
  addRecipe: (req, res) => {
    console.log('-------- in add recipe ------------');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('-------- Errors ------------');
      res.render("addRecipe", {
        layout: 'user',
        errors: errors.array()
      });
    } else {

      let recipe = req.body;

      console.log('----------- Add REcipe --------------');
      console.log(recipe);

      db.Recipe.create(recipe).then(function (dbRecipe) {
        console.log('RenderBack to userRecipes');
        res.send("userRecipes");
      });
    }
  }
};