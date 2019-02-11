const router = require("express").Router();

router.get("/",function(req,res){
  res.render("landing","");
});

router.get("/logout",function(req,res){
  res.render("landing","");
});

router.get("/userlanding", function(req, res){
  res.render("userMain",{layout:'user'});
});

router.get("/userRecipes", function(req, res){
  res.render("userRecipes",{layout:'user'});
});

router.get("/addRecipe", function(req, res){
  res.render("addRecipe",{layout:'user'});
});

router.get("/adminMain", function(req, res){
  res.render("adminMain",{layout:'user'});
});

  


module.exports = router;