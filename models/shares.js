const Sequelize =require("sequelize");
module.exports = function(sequelize, DataTypes) {
<<<<<<< HEAD:models/access.js
  var Accesses = sequelize.define("Accesses", {
=======
  var Shares = sequelize.define("Shares", {
>>>>>>> 37517c77bc974c552374990ee0b812467e812b54:models/shares.js
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
<<<<<<< HEAD:models/access.js
  return Accesses;
=======
  return Shares;
>>>>>>> 37517c77bc974c552374990ee0b812467e812b54:models/shares.js
};
