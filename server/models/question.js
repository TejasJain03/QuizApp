const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  correctAnswer: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model('Question', questionSchema)
