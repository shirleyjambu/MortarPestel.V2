const router = require("express").Router();
const recipeViewRoutes = require("./recipeViewRoutes");

router.use("/",recipeViewRoutes);

module.exports = router;