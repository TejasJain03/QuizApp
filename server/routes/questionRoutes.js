const express = require('express')
const route = express.Router()
const catchAsync = require('../utils/catchAsync')
const questionControllers = require('../controllers/questionControllers')
const authMiddleware = require('../middleware/authMiddleware')
const permit = require('../middleware/permitMiddleware')
const question = require('../models/question')

route.get(
  '/get-all-questions',
  authMiddleware,
  permit(0, 1),
  catchAsync(questionControllers.getAllQuestions),
)

route.post(
  '/add-question',
  authMiddleware,
  permit(0, 1),
  catchAsync(questionControllers.addQuestion),
)

route.get(
  '/question/:questionId',
  authMiddleware,
  permit(0),
  catchAsync(questionControllers.getQuestion)
)
route.put(
  '/update-question/:questionId',
  authMiddleware,
  permit(0,1),
  catchAsync(questionControllers.updateQuestion),
)

route.delete(
  '/delete-question/:questionId',
  authMiddleware,
  permit(0,1),
  catchAsync(questionControllers.deleteQuestion),
)

module.exports = route
