module.exports = function(sequelize, DataTypes) {
  var Ingredients = sequelize.define("ingredients", {
    // The email cannot be null, and must be a proper email before creation
    ingredient_name: {
      type: DataTypes.STRING
    }
  });
  return Ingredients;
};