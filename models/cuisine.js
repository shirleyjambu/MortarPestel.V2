const Sequelize =require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Cuisine = sequelize.define("Cuisine", {
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
  return Cuisine;
};
