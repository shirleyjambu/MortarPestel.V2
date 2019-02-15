const router = require("express").Router();
const loginController = require("./../../controller/loginController");
const userController = require("./../../controller/userController");
const adminController = require("./../../controller/adminController");
const validateMiddleware = require('./../../utils/middleware/validateUser');
const passport = require('./../../utils/middleware/passport-local');
const recipeController = require("./../../controller/recipeController");

router
  .route('/login')
  .get((req, res) => {
    res.send('Login Get')
  })
  .post(
    validateMiddleware.validateUser,
    loginController.loginUser,
    (req, res, next) => passport.authenticate('local', {
      successRedirect: '/user/userlanding',
      failureRedirect: '/',
      failureFlash: true
    })(req, res, next));
    

router
.route('/createUser')
.post(
  validateMiddleware.validateNewUser, 
  userController.createUser);

  router
  .route('/addMeasurements')
  .post(
    validateMiddleware.validateMeasurements, 
    adminController.addMeasurements);
  router
  .route('/createUser')
  .post(
    validateMiddleware.validateNewUser,
    userController.createUser);

router
  .route('/addRecipe')
  .post(
    validateMiddleware.validateRecipe,
    recipeController.addRecipe);



module.exports = router;