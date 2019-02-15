const Sequelize =require("sequelize");
module.exports = function(sequelize, DataTypes) {
  var Access = sequelize.define("access", {
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
  return Access;
};
