module.exports = function(sequelize, DataTypes) {
  var Recipes = sequelize.define("recipes", {
    // The email cannot be null, and must be a proper email before creation
    recipe_name: {
      type: DataTypes.STRING
    }
  });
  return Recipes;
};
