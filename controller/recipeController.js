const {
  validationResult
} = require('express-validator/check');
const db = require("./../models");

const promiseHandler = promise => promise
  .then(res => [null, res])
  .catch(err => [err, null]);

module.exports = {
  addRecipe: async function (req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("addRecipe", {
        layout: 'user',
        errors: errors.array()
      });
    } else {
      let recipe = req.body;
      //Set userid for recipe
      recipe.UserId = req.user.id;

      // Create Recipe
      const [recipeError, dbRecipe] = await promiseHandler(
        db.Recipe.create(recipe)
      );

      // if error return
      if (recipeError) {
        console.log(recipeError);
        res.render("addRecipe", {
          layout: 'user',
          errors: [{
            message: 'Error creating recipe'
          }]
        });
      }

      if (dbRecipe) {
        //Get ingredientlist
        let ingredientsList = JSON.parse(req.body.ingredient_list);
        console.log(ingredientsList);

        //For each ingredient available
        ingredientsList.forEach(async function (ingredient) {
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
            res.render("addRecipe", {
              layout: 'user',
              errors: [{
                msg: 'Error Adding Recipe'
              }]
            });
          }

          //Done creating ingredient
          if (dbIngredient) {
            console.log('Ingredient Created');
          }

        });
      }
      res.send(dbRecipe);
    }
  },
  updateRecipe: async function (req, res) {
    const errors = validationResult(req);
    console.log('--------------- Into Update Recipe ------------------');
    if (!errors.isEmpty()) {
      res.render("editRecipe", {
        layout: 'user',
        errors: errors.array()
      });
    } else {
      let recipe = req.body;
      //Set userid for recipe
      recipe.UserId = req.user.id;
      let recipe_id = req.params.id;
      console.log('Updating for id :' + recipe_id);

      // Create Recipe
      const [recipeError, dbRecipe] = await promiseHandler(
        db.Recipe.update(recipe,
          {
            where: {
              id: recipe_id
            }
          })
      );
      

      // if error return
      if (recipeError) {
        console.log(recipeError);
        res.render("editRecipe", {
          layout: 'user',
          errors: [{
            msg: 'Error saving recipe'
          }]
        });
      }

      if (dbRecipe) {
        //Get ingredientlist
        let ingredientsList = JSON.parse(req.body.ingredient_list);
        console.log(ingredientsList);

        //For each ingredient available
        ingredientsList.forEach(async function (ingredient) {
          //Add Recipeid to every ingredient
          ingredient.RecipeId = dbRecipe.id;

          //Create ingredient
          const [ingredientErr, dbIngredient] = await promiseHandler(
              db.Ingredients.update(ingredient,
              {
                where: {
                  id: ingredient.id
                }
              })
          );

          //Error creating ingredient
          if (ingredientErr) {
            console.log(ingredientErr);
            res.render("editRecipe", {
              layout: 'user',
              errors: [{
                msg: 'Error Editing Recipe'
              }]
            });
          }
          //Done creating ingredient
          if (dbIngredient) {
            console.log('Ingredient Saved');
          }
        });
      }
      res.send(dbRecipe);
    }
  },
  getAllRecipes: (req, res) => {
    console.log("Retrieving Recipes");
    let rArray = [];

    /*db.Access.findAll({
      where :{userId:req.user.id}
    })
    .then(data => {
      data.forEach(d=>rArray.push(d.recipeId));
    })
    .catch(err=>console.log('Error Accessing'));*/

    
    db.Recipe.findAll({
        include: [{
          model: db.Ingredients
        }],
        where: {
          $or:[{UserId: req.user.id},{
            id: {
                  $in: rArray
                }
            }]
        }
      })
      .then((dbRecipes) => {

        // getMeasurements from DB
        db.Measurements.findAll({})
          .then((dbData) => {
            let mObj = {};

            dbData.forEach(m => {
              let id = m.id;
              let name = m.measurement_name;
              mObj[id] = name;
            });

            dbRecipes.forEach(r => {
              let iArr = r.Ingredients;
              iArr.forEach((i) => {
                let im = i.ingredient_measurement;
                //Set Value to measurement
                i.ingredient_measurement = mObj[im];
              })
            })

            //console.log(dbRecipes);
            console.log('Recipe sent back to browser');
            res.render("userRecipes", {
              layout: 'user',
              recipeData: dbRecipes
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).json(err);
          });


      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getRecipeById: (req, res) => {
    let recipe_id = req.params.recipe_id;

    return db.Recipe.findByPk(recipe_id, {
      include: [{
        model: db.Ingredients,
      }]
    })
  },

  shareRecipe: (req, res) => {
    let recipe_id = req.params.recipe_id;
    let user_id = req.params.user_id;

    // add a record to the access table 
    db.Access.create({
        userId: user_id,
        recipeId: recipe_id
      })
      .then()
      .catch();

  },

  deleteRecipe: (req, res) => {
    db.Recipe.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (dbRecipe) {
        // res.send(dbRecipe);
        res.render("userRecipes", {
          layout: "user",
          message: "This recipe has been successfully deleted."
        })
      });
  },
  getRecipeToEdit: (req, res) => {
    let recipe_id = req.params.recipe_id;

    db.Recipe.findByPk(recipe_id, {
      include: [{
        model: db.Ingredients,
      }]
    }).then(function (dbRecipe) {
      console.log(dbRecipe.dataValues);
      res.render("editRecipe", {layout: "user",recipeData: dbRecipe.dataValues})  
    });
  }
};