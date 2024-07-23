const express = require('express')
const route = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const permit = require('../middleware/permitMiddleware')
const roleControllers = require('../controllers/rolesControllers')
const catchAsync = require('../utils/catchAsync')

route.post(
  '/add-role',
  authMiddleware,
  permit(0),
  catchAsync(roleControllers.addRole),
)
route.get(
  '/get-all-roles',
  authMiddleware,
  catchAsync(roleControllers.getAllRoles),
)

route.get(
    '/get-role/:id',
    authMiddleware,
    permit(0),
    catchAsync(roleControllers.getRole),
  )
  

module.exports = route
