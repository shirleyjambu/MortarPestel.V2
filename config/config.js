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
    "username": "l8lfb393r7ws3tqc",
    "password": "wccyh8dszv0126w1",
    "database": "wbqz1l8khpil5ntn",
    "host": "ysp9sse09kl0tzxj.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    "dialect": "mysql"
  }

};
