const mongoose = require('mongoose')

const testResultSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
  },
  questions: [
    {
      questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
      },
      givenAnswer: {
        type: Number,
        default: null,
      },
      correct: {
        type: Boolean,
        required: true,
      },
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
})

module.exports = mongoose.model('TestResult', testResultSchema)
