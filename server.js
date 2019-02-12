const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
<<<<<<< HEAD
const session = require("express-session");
const passport = require("./db/passport");
// const bcrypt = require("bycrypt");
// const saltRounds = 10;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
=======

var session = require("express-session");
>>>>>>> 20ff329c1f06c0c512c9c7cce5b5b2dd74de9a4e

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("hbs", exphbs(
  {extname:"hbs",
   defaultLayout: "main",
   layoutsDir: __dirname + '/views/layouts/',
   partialsDir: __dirname + '/views/partials/'}
));



app.set("view engine","hbs");
app.use(express.static("public"));
app.use(expressSession({secret: 'max', saveUninitialized:false , resave:false}));

app.use(session({ 
  secret: "keyboard cat", 
  resave: true, 
  saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/",routes);

app.listen(PORT, function() {
  console.log("MortarPestel.V2 listening on PORT " + PORT);
});