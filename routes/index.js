const router = require("express").Router();
const htmlRoutes = require("./html");
const apiRoutes = require("./api");

router.use("/",htmlRoutes);
router.use("/api",apiRoutes);

router.get("*", function(req, res) {
  res.send("<h1>File Not Found : 404 error</h1>");
});

module.exports = router;