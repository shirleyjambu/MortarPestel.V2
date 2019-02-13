require("dotenv").config();

module.exports= {
  "development": {
    "username": "root",
<<<<<<< HEAD:config/config.json
    "password": "Kiley120101",
=======
    "password": process.env.DB_PASS,
>>>>>>> 00c6eae5f4dd3521e1c4695369997deea4111d10:config/config.js
    "database": "mortar_pestel",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
