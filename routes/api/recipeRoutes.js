const router = require("express").Router();
const exApiController = require("./../../controller/exApiController");
const loginController = require("./../../controller/loginController");

router.get("/quickSearch",exApiController.getQuickSearchRecipe);

router
  .route("/login")
  .post(loginController.loginUser);

module.exports = router;