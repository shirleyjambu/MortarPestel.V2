const Sequelize = require("sequelize");

// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey:true,
      type: DataTypes.INTEGER
    },
    recipe_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    recipe_instruction: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        len: [1]
      }
    },recipe_html: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },recipe_image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },cuisine_type:{
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:'NA'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.NOW,
    }
  }, {
    timestamps: true
  });


  Recipe.associate = (models) => {
    Recipe.hasMany(models.Ingredients, { 
      foreignKey: 'RecipeId' , 
      onDelete: 'cascade'});

    Recipe.belongsTo(models.User, {
      through:'UserRecipes',
      foreignKey : 'UserId'
      });
  };

  return Recipe;
};
