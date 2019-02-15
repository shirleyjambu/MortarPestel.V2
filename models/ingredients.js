const Sequelize = require("sequelize");
const Recipe = require("./recipe");

module.exports = function(sequelize, DataTypes) {
 var Ingredients = sequelize.define("Ingredients", {
   // The email cannot be null, and must be a proper email before creation
   ingredient_name: {
     type: DataTypes.STRING,
     allowNull: false,
     validate:{
       len:[1]
     }
   },
   ingredient_quantity: {
     type: DataTypes.INTEGER,
     allowNull: false
   },
   ingredient_measurement:{
     type: DataTypes.STRING,
     allowNull:false
   },
   recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
 });

 Ingredients.associate = function(models) {
  Ingredients.belongsTo(models.Recipe, {
    foreignKey: {
      allowNull: false
    }
  });

}

 return Ingredients;
};