const Sequelize = require("sequelize");

// Creating our User model
module.exports = function (sequelize, DataTypes) {
  var Recipe = sequelize.define("Recipe", {
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

  Recipe.associate = function (models) {
    Recipe.hasMany(models.Ingredients,{
      onDelete: "cascade"
    });
  }

  Recipe.associate = function(models) {
    Recipe.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })};

  return Recipe;
};
