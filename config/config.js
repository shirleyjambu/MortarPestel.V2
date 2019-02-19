require("dotenv").config();

module.exports= {
  "development": {
    "username": "root",
    "password": process.env.DB_PASS,
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
    "username": "hk50a43umd6tkv2s",
    "password": "qepmutwhuvmx3yk0",
    "database": "aqt6r0ym55rb8vop",
    "host": "pwcspfbyl73eccbn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }
};
