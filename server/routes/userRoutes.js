const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const catchAsync = require('../utils/catchAsync')
const permit = require('../middleware/permitMiddleware')

router
  .route('/add-user')
  .post(authMiddleware, permit(0), catchAsync(authControllers.registerUser))

router.route('/login').post(catchAsync(authControllers.loginUser))

router
  .route('/logout')
  .get(authMiddleware, catchAsync(authControllers.logoutUser))

router.get('/auth/me', authMiddleware, catchAsync(authControllers.userRole))

router.get(
  '/get-user/:userId',
  authMiddleware,
  catchAsync(authControllers.getUser),
)

router.put(
  '/update-user/:userId',
  authMiddleware,
  catchAsync(authControllers.updateUser),
)

router.put(
  '/delete-user/:userId',
  authMiddleware,
  catchAsync(authControllers.deleteUser),
)

router.get(
  '/all-teachers',
  authMiddleware,
  permit(0),
  catchAsync(authControllers.getAllTeachers),
)
router.get(
  '/all-students',
  authMiddleware,
  permit(0, 1),
  catchAsync(authControllers.getAllStudents),
)
router.get(
  '/all-tests',
  // authMiddleware,
  // permit('admin'),
  catchAsync(authControllers.getAllTests),
)
router.get(
  '/all-questions',
  authMiddleware,
  permit(0, 1),
  catchAsync(authControllers.getAllQuestions),
)

module.exports = router
