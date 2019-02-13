const router = require("express").Router();
const loginController = require("./../../controller/loginController");
const userController = require("./../../controller/userController");
const adminController = require("./../../controller/adminController");
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

  router
  .route('/addMeasurements')
  .post(
    validateMiddleware.validateMeasurements, 
    adminController.addMeasurements);
  

module.exports = router;