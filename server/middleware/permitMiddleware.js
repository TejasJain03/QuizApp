const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')

const permit = (...allowedRoles) => {
  return catchAsync(async (req, res, next) => {
    const userRole = req.user.role

    if (allowedRoles.includes(userRole)) {
      return next()
    } else {
      throw new ExpressError(403, false, 'Access denied.')
    }
  })
}

module.exports = permit
