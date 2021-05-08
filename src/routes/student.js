// ===== Student Routes
// import all modules
const express = require('express')
const upload = require('express-fileupload')

// import all controllers
const studentController = require('../controllers/student')

// import all middlewares
const studentMiddleware = require('../middlewares/student')
const authMiddleware = require('../middlewares/auth')

// init router
const router = express.Router()

// setup upload file
router.use(upload({
  createParentPath: true
}))

router.post(
  '/',
  authMiddleware.isLogin,
  studentMiddleware.isCreateStudentValid,
  studentController.create
)

module.exports = router
