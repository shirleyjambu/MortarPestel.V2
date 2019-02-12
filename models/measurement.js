var Sequelize = require("sequelize");

var connection = new Sequelize("mortar_pestel", "root", "null", {
  host:"localhost",
  dialect: "mysql",
  operatorsAliases: false,
});

module.exports = function(sequelize, DataTypes) {
  var Measurements = sequelize.define("measurements", {
    // The measurement cannot be nulll and must be a interger.
    measurement_name: {
      type: DataTypes.STRING
  
    },
    measurement_amount: {
      type: DataTypes.INTEGER
    }
    
  });
  return Measurements;
};

connection.sync();