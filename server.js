const express = require("express");
const routes = require("./routes");
const exphbs = require("express-handlebars");
const session = require("express-session");
const db = require("./models");
const passport = require("./utils/middleware/passport-local");
const flash = require('connect-flash');

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

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

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


