const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
var session = require("express-session");

var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var passport = require("./config/passport");

app.engine("hbs", exphbs(
  {extname:"hbs",
   defaultLayout: "main",
   layoutsDir: __dirname + '/views/layouts/',
   partialsDir: __dirname + '/views/partials/'}
));

app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine","hbs");

app.use(express.static("public"));

app.use("/",routes);

app.listen(PORT, function() {
  console.log("MortarPestel.V2 listening on PORT " + PORT);
});