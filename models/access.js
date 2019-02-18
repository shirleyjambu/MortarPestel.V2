const Sequelize =require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Accesses = sequelize.define("Accesses", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      },
      createdAt:{
        type:DataTypes.DATE,
        allowNull : true,
        defaultValue: Sequelize.NOW
      },
      updatedAt:{
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      }
    },{
      timestamps: true
    });
  return Accesses;
};
