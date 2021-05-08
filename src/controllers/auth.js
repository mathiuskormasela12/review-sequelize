// ===== Auth Controller
// import all modules
const response = require('../helpers/response')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../models')

const {
  SECRET_KEY
} = process.env

exports.register = async (req, res) => {
  const {
    username,
    password
  } = req.body
  try {
    const isExist = await User.findOne({
      where: { username }
    })

    if (!isExist) {
      const hash = await bcrypt.hash(password, 8)

      try {
        await User.create({
          username,
          password: hash
        })
        return response(res, 200, true, 'Login successfully')
      } catch (err) {
        console.log(err)
        return response(res, 500, false, err.message)
      }
    } else {
      return response(res, 400, true, 'Username already in use')
    }
  } catch (err) {
    return response(res, 500, false, err.message)
  }
}

exports.login = async (req, res) => {
  const {
    username,
    password
  } = req.body

  try {
    const isExist = await User.findOne({ username })

    if (!isExist || !(await bcrypt.compare(password, isExist.password))) {
      return response(res, 400, false, 'Wrong username or password')
    } else {
      const data = {
        id: isExist.id,
        username
      }
      const token = jwt.sign(data, SECRET_KEY, {
        expiresIn: 60
      })
      return response(res, 200, true, 'Success to login', { token })
    }
  } catch (err) {
    console.log(err)
    return response(res, 500, false, err.message)
  }
}
