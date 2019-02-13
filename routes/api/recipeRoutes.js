const router = require("express").Router();
const loginController = require("./../../controller/loginController");
const userController = require("./../../controller/userController");
const validateMiddleware = require('./../../utils/middleware/validateUser');
const passport = require('./../../utils/middleware/passport-local');

router
  .route('/login')
  .get((req, res)=>{res.send('Login Get')})
  .post(
    validateMiddleware.validateUser,
    passport.authenticate('local',{ 
      successRedirect: '/user/userlanding',
      failureRedirect: '/failure'  
    }), 
    loginController.loginUser
    );

router
.route('/createUser')
.post(
  validateMiddleware.validateNewUser, 
  userController.createUser);
  

module.exports = router;