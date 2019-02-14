const router = require("express").Router();
const exApiController = require("./../../controller/exApiController");

// Landing
router.get("/",function(req,res){
  res.render("landing","");
});

//Logout
router.get("/logout",function(req, res){
  req.logout();
  res.render("landing","");
});

//Logout
router.get("/addUser",function(req,res){
  res.render("addUser",{layout:'guest'});
});

//Quick Search
router.get("/quickSearch",exApiController.getQuickSearchRecipe);

module.exports = router;