const router = require("express").Router();

const exApiController = require("./../../controller/exApiController");

// Landing
router.get("/",function(req,res){
  res.render("landing","");
});

//Logout
router.get("/logout",function(req,res){
  res.render("landing","");
});

//Quick Search
router.get("/quickSearch",exApiController.getQuickSearchRecipe);


module.exports = router;