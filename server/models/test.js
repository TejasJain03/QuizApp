const mongoose = require('mongoose')
const Role = require('../utils/roles')

const testSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
  ],
  subject: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  testGiven: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  allowedRoles: {
    type: [Number],
    enum: [Role.ADMIN, Role.TEACHER, Role.STUDENT],
    required: true,
  },
})

module.exports = mongoose.model('Test', testSchema)
