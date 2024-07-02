const express = require('express')
const route = express.Router()
const testControllers = require('../controllers/testControllers')
const catchAsync = require('../utils/catchAsync')
const permit = require('../middleware/permitMiddleware')
const authMiddleware = require('../middleware/authMiddleware')
const checkTestAccess = require('../middleware/checkTestAccess')

route.get(
  '/get-all-tests',
  authMiddleware,
  catchAsync(testControllers.getAllTest),
)

route.get(
  '/get-test/:testId',
  authMiddleware,
  catchAsync(testControllers.getTest),
)

route.get(
  '/given-tests',
  authMiddleware,
  catchAsync(testControllers.givenTests),
)
route.get(
  '/given-test-details/:testResultId',
  authMiddleware,
  catchAsync(testControllers.givenTestDetails),
)

route.get('/test-results/:testId',authMiddleware,catchAsync(testControllers.testResults))

route.post(
  '/generate-test',
  authMiddleware,
  permit(0, 1),
  catchAsync(testControllers.generateTest),
)

route.post(
  '/submit-test',
  authMiddleware,
  checkTestAccess,
  testControllers.submitTest,
)

module.exports = route
