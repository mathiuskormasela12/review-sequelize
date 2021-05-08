// ===== Auth Middlewares
// import all modules
const response = require('../helpers/response')
const jwt = require('jsonwebtoken')
const { body, validationResult } = require('express-validator')

const {
  SECRET_KEY
} = process.env

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

exports.isLogin = (req, res, next) => {
  const token = req.headers.authorization

  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decode) => {
      if (err) {
        return response(res, 400, false, err.message)
      } else {
        req.data = decode
        return next()
      }
    })
  } else {
    return response(res, 400, false, 'Forbidden')
  }
}
