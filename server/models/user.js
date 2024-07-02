const mongoose = require('mongoose')
const Role = require('../utils/roles')
// const testResultSchema = require('../models/testResult')
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: Number,
    enum: [Role.ADMIN, Role.TEACHER, Role.STUDENT],
    default: 2,
    required: true,
  },
})

module.exports = mongoose.model('User', userSchema)
