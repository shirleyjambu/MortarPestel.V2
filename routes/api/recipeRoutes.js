const router = require("express").Router();
const exApiController = require("./../../controller/exApiController");
const loginController = require("./../../controller/loginController");
const { check } = require('express-validator/check')

router.get("/quickSearch",exApiController.getQuickSearchRecipe);

router
  .route("/login")
  .post([
    check('userName').isLength({ min: 3 }),
    check('userPassword').isLength({min: 2})
      ],loginController.loginUser);

      


module.exports = router;