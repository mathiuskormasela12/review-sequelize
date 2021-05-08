// ===== Student Controller
// import all modules
const response = require('../helpers/response')
const upload = require('../helpers/upload')

// import models
const { Student } = require('../models')

exports.create = async (req, res) => {
  try {
    const isExist = await Student.findOne({
      where: {
        nisn: req.body.nisn
      }
    })

    if (!isExist) {
      try {
        const photo = await upload(req, res)

        if (typeof photo === 'object') {
          return response(res, photo.status, photo.success, photo.message)
        } else {
          try {
            await Student.create({
              ...req.body,
              photo
            })

            return response(res, 200, true, 'Success to add new student', {
              ...req.body,
              photo
            })
          } catch (err) {
            return response(res, 500, false, err.message)
          }
        }
      } catch (err) {
        return response(res, 500, false, err.message)
      }
    } else {
      return response(res, 400, false, 'NISN already in use')
    }
  } catch (err) {

  }
  return response(res, 200, true, 'welcome')
}
