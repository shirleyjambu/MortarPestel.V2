const { check } = require('express-validator/check');

module.exports.validateUser = [
  check('userName').isLength({ min: 6 }).withMessage('UserName should be atleast 6 characters.'),
  check('userPassword').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters.'),
];

module.exports.validateNewUser = [
  check('first_name').isLength({ min: 3 }).withMessage('FirstName should be atleast 6 characters.'),
  check('last_name').isLength({ min: 3 }).withMessage('LastName should be atleast 8 characters.'),
  check('email').isEmail().withMessage('Email not valid.'),
  check('password').isLength({ min: 8 }).withMessage('Password should be atleast 8 characters.'),
];