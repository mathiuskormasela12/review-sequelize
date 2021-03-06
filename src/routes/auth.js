// ===== Auth Routes
// import all modules
const express = require('express')
const upload = require('express-fileupload')

// import all controllers
const authController = require('../controllers/auth')

// import all middlewares
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

// setup upload file
router.use(upload({
  createParentPath: true
}))

router.post(
  '/register',
  authMiddleware.checkAuthForm,
  authController.register
)

router.post(
  '/login',
  authMiddleware.checkAuthForm,
  authController.login
)

module.exports = router
