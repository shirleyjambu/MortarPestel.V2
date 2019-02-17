const Sequelize =require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Cuisines = sequelize.define("Cuisines", {
    cuisine_name: {
      type: DataTypes.STRING,
      allowNull: false
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
 
  },
  {
    timestamps: true
  });
  return Cuisines;
 };
