const router = require("express").Router();
const exApiController = require("./../../controller/exApiController");
const loginController = require("./../../controller/loginController");
const { check, validationResult } = require('express-validator/check');

router.get("/quickSearch",exApiController.getQuickSearchRecipe);

router
  .route("/login")
  .post([
    check('userName').isLength({ min: 3 }).withMessage('Invalid Username'),
    check('userPassword').isLength({min: 6}).withMessage('Passport must be atleast 6 chars.')
      ],function(req,res){
        console.log("... In after check ...");
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log("........... Error .........");
          res.render("landing",{ errors: errors.array() });
        }

        loginController.loginUser;
      }
  );

      


module.exports = router;