// ===== Response

function response (res, status, success, message, results) {
  return res.status(status).json({
    status,
    success,
    message,
    results: results && results
  })
}

module.exports = response
