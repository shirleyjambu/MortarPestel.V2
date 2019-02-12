const router = require("express").Router();
const loginController = require("./../../controller/loginController");
const validateMiddleware = require('./../../utils/middleware/validateUser');

router
  .route('/login')
  .post(
    validateMiddleware.validateUser, 
    loginController.loginUser
    );


module.exports = router;