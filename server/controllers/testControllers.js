const Test = require('../models/test')
const Question = require('../models/question')
const TestResult = require('../models/testResult')

exports.generateTest = async (req, res) => {
  const { date, subject, allowedRoles } = req.body
  const questions = await Question.aggregate([{ $sample: { size: 10 } }])

  const newTest = new Test({
    date,
    subject,
    allowedRoles,
    questions: questions.map((q) => q._id),
  })

  await newTest.save()

  const populatedTest = await newTest.populate('questions')

  res.status(201).json(populatedTest)
}

exports.getAllTest = async (req, res) => {
  const user = req.user
  const userRole = user.role
  const userId = user._id

  const tests = await Test.find({
    allowedRoles: userRole,
    testGiven: { $nin: [userId] },
  })

  res.status(200).send({ message: 'Tests retrieved successfully!', tests })
}

exports.getTest = async (req, res) => {
  const { testId } = req.params
  const test = await Test.findById(testId).populate({
    path: 'questions',
    select: 'text options',
  })
  if (!test) {
    return res.status(404).json({ message: 'Test not found' })
  }

  res.status(200).json({ message: 'Test retrieved successfully!', test })
}

exports.submitTest = async (req, res) => {
  const { questions, testId } = req.body
  const user = req.user._id

  let score = 0
  const populatedQuestions = []

  const questionIds = questions.map((q) => q._id)
  const fetchedQuestions = await Question.find({ _id: { $in: questionIds } })

  const questionMap = new Map()
  fetchedQuestions.forEach((q) => {
    questionMap.set(q._id.toString(), q)
  })

  for (const question of questions) {
    const q = questionMap.get(question._id)
    if (q) {
      const givenAnswer =
        question.givenAnswer !== undefined ? question.givenAnswer : null
      const isCorrect = givenAnswer !== null && q.correctAnswer === givenAnswer

      populatedQuestions.push({
        questionId: q._id,
        givenAnswer: givenAnswer,
        correct: isCorrect,
      })

      if (isCorrect) score += 1
    }
  }

  const test = await Test.findById(testId)
  if (!test) {
    return res.status(404).send({ message: 'Test not found' })
  }

  test.testGiven.push(user)
  await test.save()

  const newTestResult = new TestResult({
    user,
    score,
    questions: populatedQuestions,
    testId,
  })

  await newTestResult.save()

  res
    .status(201)
    .send({ message: 'Test submitted successfully!', newTestResult })
}

exports.givenTests = async (req, res) => {
  const userId = req.user._id

  const testResults = await TestResult.find({ user: userId }).populate(
    'testId',
    'subject date',
  )

  console.log(testResults)

  if (!testResults || testResults.length === 0) {
    return res
      .status(404)
      .json({ message: 'No test results found for this user' })
  }
  res
    .status(200)
    .json({ message: 'Test results retrieved successfully!', testResults })
}

exports.givenTestDetails = async (req, res) => {
  const { testResultId } = req.params
  const testResult = await TestResult.findById(testResultId)
    .populate('testId', 'subject')
    .populate({
      path: 'questions.questionId',
      select: 'text options',
    })

  if (!testResult) {
    return res.status(404).json({ message: 'Test result not found' })
  }

  res.status(200).json({ testResult })
}

exports.testResults = async (req, res) => {
  const { testId } = req.params
  const testResults = await TestResult.find({ testId: testId }).populate(
    'user',
    'name email',
  )
  res
    .status(200)
    .json({ success: true, message: 'Succesfully Found', testResults })
}
