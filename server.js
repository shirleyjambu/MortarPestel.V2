const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
const expressSession = require("express-session");

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

app.use("/",routes);

app.listen(PORT, function() {
  console.log("MortarPestel.V2 listening on PORT " + PORT);
});