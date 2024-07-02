// middleware/checkTestAccess.js
const Test = require('../models/test')
const ExpressError = require('../utils/ExpressError')
const Role = require('../utils/roles')

const checkTestAccess = async (req, res, next) => {
  const { testId } = req.body
  const userRole = req.user.role

  const test = await Test.findById(testId)
  if (!test) {
    return res.status(404).json({ success: false, message: 'Test not found' })
  }

  if (!test.allowedRoles.includes(userRole)) {
    return res
      .status(403)
      .json({
        success: true,
        message: 'You do not have permission to take this test.',
      })
  }

  next()
}

module.exports = checkTestAccess
