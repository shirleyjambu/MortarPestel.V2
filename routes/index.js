const router = require("express").Router();
const publicRoutes = require("./html/recipeViewRoutes");
const authRoutes = require("./html/authRoutes");
const apiRoutes = require("./api");

router.use("/",publicRoutes);
router.use("/api",apiRoutes);
router.use('/user', authRoutes);

router.get("*", function(req, res) {
  res.send("<h1>File Not Found : 404 error</h1>");
});

module.exports = router;


