const {body} = require('express-validator');

const validateSignUp = [
    body('username')
    .trim().notEmpty().withMessage('username is require')
    .isLength({min : 5}).withMessage('username should be atleast 5 character long'),

    body('email')
    .notEmpty().withMessage('email is require')
    .isEmail().withMessage('Invalid Email Format'),

    body('password')
    .notEmpty().withMessage('password is require')
    .isLength({mid : 8}).withMessage('password Must be atleast 8 character long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one digit.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.')
    .not().matches(/\s/).withMessage('Password must not contain spaces.')
]

const validationLogin = [
    body('username')
    .trim().notEmpty().withMessage('username is require')
    .isLength({min : 5}).withMessage('username should be atleast 5 character long'),

    body('password')
    .notEmpty().withMessage('password is require')
    .isLength({mid : 8}).withMessage('password Must be atleast 8 character long')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one digit.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/).withMessage('Password must contain at least one special character.')
    .not().matches(/\s/).withMessage('Password must not contain spaces.')

]

module.exports = {
    validateSignUp,
    validationLogin
}