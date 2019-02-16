const {validationResult} = require('express-validator/check');
const db = require("./../models");

const promiseHandler = promise => promise
  .then(res => [null, res])
  .catch(err => [err, null]);


module.exports = {
  addRecipe: async function(req, res) {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      res.render("addRecipe", {layout: 'user',errors: errors.array()});
    } else {
      let recipe = req.body;
      //Set userid for recipe
      recipe.UserId=req.user.id;

      // Create Recipe
      const [recipeError, dbRecipe] = await promiseHandler(
        db.Recipe.create(recipe)
      );

      // if error return
      if (recipeError) {
        console.log(recipeError);
        res.render("addRecipe", {
          layout: 'user',
          errors: [{message:'Error creating recipe'}]});
      }

      if(dbRecipe){
        //Get ingredientlist
        let ingredientsList = JSON.parse(req.body.ingredient_list);
        console.log(ingredientsList);

        //For each ingredient available
        ingredientsList.forEach(async function(ingredient) {
          //Add Recipeid to every ingredient
          ingredient.RecipeId = dbRecipe.id;
          
          //Create ingredient
          const [ingredientErr, dbIngredient] = await promiseHandler(
            //db.Ingredients.bulkCreate(ingredients, { returning: true })
            db.Ingredients.create(ingredient)
          );
          
          //Error creating ingredient
          if (ingredientErr) {
            console.log(ingredientErr);
            res.render("addRecipe",{layout:'user',errors:[{msg:'Error Adding Recipe'}]});
          }

          //Done creating ingredient
          if(dbIngredient){
            console.log('Ingredient Created');
          }

        });
      }
      res.send(dbRecipe);
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
  },
  getRecipeById : (req, res) => {
    let recipe_id = req.params.recipe_id;
    
    return db.Recipe.findByPk(recipe_id,{include: [
      {
          model: db.Ingredients,
      }
  ]})
  }

};