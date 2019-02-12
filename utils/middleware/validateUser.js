const { check } = require('express-validator/check');

module.exports.validateUser = [
  check('userName').isLength({ min: 6 }).withMessage('UserName should be atleast 6 characters.'),
  check('userPassword').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters.'),
];