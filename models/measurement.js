const Sequelize =require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var Measurements = sequelize.define("Measurements", {
    // The measurement cannot be nulll and must be a interger.
    measurement_name: {
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
  return Measurements;
};
