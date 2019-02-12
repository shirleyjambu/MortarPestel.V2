const router = require("express").Router();
const loginController = require("./../../controller/loginController");
const userController = require("./../../controller/userController");
const validateMiddleware = require('./../../utils/middleware/validateUser');

router
  .route('/login')
  .post(
    validateMiddleware.validateUser, 
    loginController.loginUser
    );

router
.route('/createUser')
.post(
  validateMiddleware.validateNewUser, 
  userController.createUser);
  

module.exports = router;