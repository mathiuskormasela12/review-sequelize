// ===== Uploads
// import all modules
const path = require('path')

function upload (req, res) {
  if (!req.files) {
    return {
      status: 400,
      success: false,
      message: 'Must upload image'
    }
  }

  const picture = req.files.photo

  // check extension
  const extValid = /jpg|jpeg|png/gi
  const isExtValid = extValid.test(picture.name.split('.').pop())
  const isMimeTypeValid = extValid.test(picture.mimetype)

  if (!isExtValid && !isMimeTypeValid) {
    return {
      status: 400,
      success: false,
      message: 'please select image file'
    }
  }

  // check file size
  if (picture.size > 3000000) {
    return {
      status: 400,
      success: false,
      message: 'Image too large'
    }
  }

  let photo = picture.name.split('.')[0]
  photo += '-'
  photo += Date.now()
  photo += '.'
  photo += picture.name.split('.').pop().toLowerCase()

  picture.mv(path.join(__dirname, '../../uploads/' + photo))

  return photo
}

module.exports = upload
