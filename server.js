const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");
const db = require("./models");
const passport = require("./utils/middleware/passport-local");

var app = express();
var PORT = process.env.PORT || 3000;

app.engine("hbs", exphbs(
  {extname:"hbs",
   defaultLayout: "main",
   layoutsDir: __dirname + '/views/layouts/',
   partialsDir: __dirname + '/views/partials/'}
));
app.set("view engine","hbs");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.use("/",routes);

db.sequelize.sync({force:false})
.then(()=>{
  app.listen(PORT, function() {
    console.log("MortarPestel.V2 listening on PORT " + PORT);
  });
})
.catch((err)=>{
  console.log('Error creating Mortar_Pestel DB');
  console.log(err);
});

