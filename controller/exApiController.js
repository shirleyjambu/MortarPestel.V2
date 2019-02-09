require("dotenv").config();
const axios = require('axios');
const keys = require('./../keys.js');

module.exports = {
  getQuickSearchRecipe: function(req,res){
    let ingredient = req.query.ingredient;
    let app_id = keys.edamam.id;
    let app_key = keys.edamam.secret;

    let queryURL = "https://api.edamam.com/search?q=" + ingredient + "&app_id=" + app_id + "&app_key=" + app_key;

    if(!ingredient){
      res.render("landing",{errorMsg:'Please enter ingredient'});
    }else{
      axios.get(queryURL)
        .then(response => {
          res.render("quickSearch",{layout:'guest', recipeData:response.data.hits});
        })
        .catch(error => {
          console.log(error);
        });
    }

    
  }
};

