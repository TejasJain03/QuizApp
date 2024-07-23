const Question = require('../models/question')

exports.addQuestion = async (req, res) => {
  const question = new Question(req.body)
  console.log(req.body)
  try {
    await question.save()

    res.status(201).send(question)
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getQuestion = async (req, res) => {
  const { questionId } = req.params
  const question = await Question.findById(questionId)

  if (!question) {
    return res.status(404).json({ message: 'Question not found' })
  }

  res.status(200).json({ question })
}

exports.getAllQuestions = async (req, res) => {
  const questions = await Question.find()
  res.json(questions)
}

exports.getRandomQuestions = async (req, res) => {
  const questions = await Question.aggregate([{ $sample: { size: 10 } }])
  res.status(200).send(questions)
}

exports.updateQuestion = async (req, res) => {
  const { questionId } = req.params
  const updates = req.body

  const updatedQuestion = await Question.findByIdAndUpdate(
    questionId,
    updates,
    {
      new: true,
    },
  )
  if (!updatedQuestion) {
    return res.status(404).send({ message: 'Question not found' })
  }
  res
    .status(200)
    .send({ message: 'Question updated successfully!', updatedQuestion })
}

exports.deleteQuestion = async (req, res) => {
  const questionId = req.params.questionId

  const deletedQuestion = await Question.findByIdAndDelete(questionId)

  if (!deletedQuestion) {
    return res.status(404).send({ message: 'Question not found' })
  }
  res.status(200).send({ message: 'Question deleted successfully!' })
}
