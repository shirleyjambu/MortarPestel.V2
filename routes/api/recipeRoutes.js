const router = require("express").Router();
const loginController = require("./../../controller/loginController");
const userController = require("./../../controller/userController");
const adminController = require("./../../controller/adminController");
const validateMiddleware = require('./../../utils/middleware/validateUser');
const passport = require('./../../utils/middleware/passport-local');
const recipeController = require("./../../controller/recipeController");
const pdfController = require("./../../controller/pdfController");
const cloudinaryMiddleware = require('./../../utils/middleware/cloudinary');


router
  .route('/login')
  .get((req, res,next) => {
    res.send('Login Get')
  })
  .post(
    validateMiddleware.validateUser,
    loginController.loginUser,
    (req, res, next) => passport.authenticate('local', {
      successRedirect: '/user/userlanding',
      failureRedirect: '/loginError',
      failureFlash: true
    })(req, res, next));
    

router
.route('/createUser')
.post(
  validateMiddleware.validateNewUser, 
  userController.createUser);


  router
  .route('/addItems')
  .post(
    validateMiddleware.validateItems, 
    adminController.addItems);

  
router
  .route('/addRecipe')
  .post(
    cloudinaryMiddleware,
    validateMiddleware.validateRecipe,
    recipeController.addRecipe);

router
  .route('/getPDF/:recipe_id')
  .get(pdfController.getPDF);    


module.exports = router;