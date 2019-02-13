const router = require('express').Router();
const recipeController = require("./../../controller/recipeController");

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

module.exports = router;
