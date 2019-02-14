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
  .route('/createUser')
  .post(
    validateMiddleware.validateNewUser,
    userController.createUser);

 router
  .route('/addItems')
  .post(
    //validateMiddleware.validateItems,
    adminController.addItems);

router
.route('/getAllMeasurements')
.get(adminController.getAllMeasurements);
    
router
.route('/getAllCuisines')
.get(adminController.getAllCuisines);  

router
  .route('/addRecipe')
  .post(
    validateMiddleware.validateRecipe,
    recipeController.addRecipe);

    

module.exports = router;