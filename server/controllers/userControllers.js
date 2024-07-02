const ExpressError = require('../utils/ExpressError')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Test = require('../models/test')
const generateToken = require('../utils/generateToken')
const jwt = require('jsonwebtoken')
const Question = require('../models/question')

exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    throw new ExpressError(401, false, 'You have already exists.')
  }
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })
  res.send({ success: true, message: 'User Successfully created', user })
}

exports.getUser = async (req, res) => {
  const { userId } = req.params
  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }
  res.status(200).json({ user: user })
}

exports.updateUser = async (req, res) => {
  const { userId } = req.params
  const { name, email, role } = req.body

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { name, email, role },
    { new: true },
  )

  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ user: updatedUser })
}

exports.deleteUser = async (req, res) => {
  const { userId } = req.params

  const deletedUser = await User.findByIdAndDelete(userId)

  if (!deletedUser) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.status(200).json({ message: 'User deleted successfully' })
}

exports.userRole = async (req, res) => {
  const userId = req.user._id
  const user = await User.findById(userId)

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' })
  }
  return res.status(200).json({ success: true, user: user })
}

exports.loginUser = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    throw new ExpressError(401, false, 'Please register first!')
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    throw new ExpressError(
      401,
      false,
      'Incorrect Credentials!!! Please try again',
    )
  }

  generateToken(res, user._id)

  res.status(201).send({
    success: true,
    _id: user._id,
    name: user.name,
    email: user.email,
    message: 'Login successful!',
    user: user,
  })
}

exports.logoutUser = async (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    expires: new Date(0),
    path: '/',
  })

  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, proxy-revalidate',
  )

  res.status(200).send({ success: true, message: 'Logged out successfully!' })
}

exports.getAllTeachers = async (req, res) => {
  const teachers = await User.find({ role: 1 })
  res.json({ success: true, message: 'Successfully found', teachers })
}

exports.getAllStudents = async (req, res) => {
  const students = await User.find({ role: 2 })
  res.json({ success: true, message: 'Successfully found', students })
}

exports.getAllTests = async (req, res) => {
  const tests = await Test.find()
  res.json({ success: true, message: 'Successfully found', tests })
}

exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find()
  res.json({ success: true, message: 'Successfully found', questions })
}
