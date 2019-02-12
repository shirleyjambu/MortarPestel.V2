const router = require("express").Router();
const recipeRoutes = require("./recipeRoutes");


router.use("/",recipeRoutes);


module.exports = router;