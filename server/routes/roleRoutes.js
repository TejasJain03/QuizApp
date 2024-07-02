const express = require('express')
const route = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const permit = require('../middleware/permitMiddleware')
const roleControllers = require('../controllers/rolesControllers')

route.post('/add-role', authMiddleware, permit(0), roleControllers.addRole)

module.exports = route
