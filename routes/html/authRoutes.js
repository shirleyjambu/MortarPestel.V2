const router = require('express').Router();
const recipeController = require("./../../controller/recipeController");
const userController = require("./../../controller/userController");
const adminController = require("./../../controller/adminController");
const authorize = require("./../../utils/middleware/isAuthenticated");

router.use(authorize);

router.get("/user-info", userController.getSessionUser);

router.get("/userlanding", function(req, res){
  res.render("userMain",{layout:'user'});
});

router.route("/userRecipes")
  .get(recipeController.getAllRecipes);

router.get("/addRecipe", function(req, res){
  res.render("addRecipe",{layout:'user'});
});

router.get("/adminMain", function(req, res){
  res.render("adminMain",{layout:'user'});
});

router.get("/getMeasurements",adminController.getAllMeasurements);

router.get("/getCuisine",adminController.getAllCuisines);

router.get("/getCategory",adminController.getAllCategory);

router.get("/getUser",adminController.getAllUser);

router.get("/shareRecipe/:email/:recipe_id",userController.shareRecipe);

router.get("/deleteRecipe/:id",recipeController.deleteRecipe);

router.get("/getRecipe/:recipe_id",recipeController.getRecipeToEdit);

router.get("/deleteItems/:id/:table",adminController.deleteItems);

module.exports = router;
