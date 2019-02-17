const Sequelize = require("sequelize");


module.exports = function(sequelize, DataTypes) {
 var Ingredients = sequelize.define("Ingredients", {
  id:{
    allowNull: false,
    autoIncrement: true,
    primaryKey:true,
    type: DataTypes.INTEGER
  },
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
   }
 });

Ingredients.associate = function(models) {
  Ingredients.belongsTo(models.Recipe, {
    through:'RecipeIngredients',
    foreignKey : 'RecipeId'
    })
};

return Ingredients;
};