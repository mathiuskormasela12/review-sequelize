// ===== Student Middlewares
// import all modules
const { body, validationResult } = require('express-validator')
const response = require('../helpers/response')

exports.isCreateStudentValid = [
  body('full_name', "Full Name can't be empty")
    .notEmpty(),
  body('nisn', "NISN can't be empty")
    .notEmpty(),
  body('nisn', 'NISN include 5 number')
    .isLength({
      min: 5,
      max: 5
    }),
  body('class', "Class can't be empty")
    .notEmpty(),
  body('major', "Major can't be empty")
    .notEmpty(),
  (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return response(res, 400, false, errors.array()[0].msg)
    }

    return next()
  }
]
