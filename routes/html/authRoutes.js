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

router.get("/userRecipes",recipeController.getAllRecipes);


router.get("/addRecipe", function(req, res){
  res.render("addRecipe",{layout:'user'});
});

router.get("/adminMain", function(req, res){
  res.render("adminMain",{layout:'user'});
});

router.get("/getMeasurements",adminController.getAllMeasurements);

router.get("/getCuisine",adminController.getAllCuisines);

module.exports = router;
