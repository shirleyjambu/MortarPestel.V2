const {
  validationResult
} = require('express-validator/check');
var db = require("./../models");

module.exports = {
  /*addRecipe: async function(req, res) {
    console.log(req.body);
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
      const [recipeError, dbRecipe] = await promiseHandler(
        db.Recipe.create(recipe).then(function (dbRecipe) {
          console.log('RenderBack to userRecipes');
        })
      );

      // if error stop running now
      if (recipeError) {
        console.log(recipeError);
        res.render("addRecipe", {
          layout: 'user',
          errors: [{message:'Error creating recipe'}]});
        //return res.status(400).json(postError);
      }

        // create pairings for multiple category creates in PostCategories through table
      const ingredients = req.body.ingredientList
      //.filter(category => (category !== "undefined"))
      .map(ingredient => ({
        RecipeId: dbRecipe.id,
        IngredientId: ingredient
      }));
      
      console.log(ingredients);
      // create relationship between post and category
      const [ingredientErr, dbIngredient] = await promiseHandler(
        db.ingredient.bulkCreate(ingredients, { returning: true })
      );

      if (ingredientErr) {
        console.log(ingredientErr);
        return res.status(400).json(ingredientErr);
      }
  
      res.json({ message: 'Ingredient successfully created!' });

    }
  },*/
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
      db.Recipe.create(recipe).then(function (dbRecipe) {
        console.log('RenderBack to userRecipes');
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