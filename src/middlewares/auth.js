// ===== Auth Middlewares
// import all modules
const response = require('../helpers/response')
const { body, validationResult } = require('express-validator')

exports.checkAuthForm = [
  body('username', "Username can't be empty")
    .notEmpty(),
  body('username', 'Username too long')
    .isLength({ max: 100 }),
  body('password', "Password can't be empty")
    .notEmpty(),
  body('password', 'Week password')
    .isStrongPassword(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
