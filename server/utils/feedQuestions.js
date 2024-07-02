const mongoose = require('mongoose')
const Question = require('../models/question')

const questions = [
  {
    text: 'Which planet is closest to the sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    correctAnswer: 2,
    category: 'Astronomy',
  },
  {
    text: 'What is the largest bone in the human body?',
    options: ['Femur', 'Humerus', 'Tibia', 'Fibula'],
    correctAnswer: 0,
    category: 'Biology',
  },
  {
    text: 'Who developed the theory of relativity?',
    options: [
      'Isaac Newton',
      'Galileo Galilei',
      'Albert Einstein',
      'Nikola Tesla',
    ],
    correctAnswer: 2,
    category: 'Physics',
  },
  {
    text: 'What is the capital city of Australia?',
    options: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'],
    correctAnswer: 2,
    category: 'Geography',
  },
  {
    text: 'Which country won the FIFA World Cup in 2018?',
    options: ['Germany', 'Brazil', 'France', 'Argentina'],
    correctAnswer: 2,
    category: 'Sports',
  },
  {
    text: 'What is the process by which plants make their food?',
    options: ['Respiration', 'Photosynthesis', 'Transpiration', 'Osmosis'],
    correctAnswer: 1,
    category: 'Biology',
  },
  {
    text: 'Who painted the ceiling of the Sistine Chapel?',
    options: ['Leonardo da Vinci', 'Raphael', 'Michelangelo', 'Donatello'],
    correctAnswer: 2,
    category: 'Art',
  },
  {
    text: 'What is the capital city of Canada?',
    options: ['Toronto', 'Vancouver', 'Montreal', 'Ottawa'],
    correctAnswer: 3,
    category: 'Geography',
  },
  {
    text: 'Which organ is responsible for pumping blood throughout the body?',
    options: ['Lungs', 'Liver', 'Brain', 'Heart'],
    correctAnswer: 3,
    category: 'Biology',
  },
  {
    text: 'Which element is known as the King of Chemicals?',
    options: ['Hydrogen', 'Oxygen', 'Sulfur', 'Carbon'],
    correctAnswer: 3,
    category: 'Chemistry',
  },
  {
    text: 'What is the hardest natural substance on Earth?',
    options: ['Diamond', 'Gold', 'Iron', 'Platinum'],
    correctAnswer: 0,
    category: 'Science',
  },
  {
    text: "Which gas is most abundant in the Earth's atmosphere?",
    options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
    correctAnswer: 2,
    category: 'Science',
  },
  {
    text: 'Who was the first President of the United States?',
    options: [
      'Thomas Jefferson',
      'Abraham Lincoln',
      'George Washington',
      'John Adams',
    ],
    correctAnswer: 2,
    category: 'History',
  },
  {
    text: 'Which planet is known as the Morning Star or the Evening Star?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 0,
    category: 'Astronomy',
  },
  {
    text: 'What is the main component of the sun?',
    options: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Helium'],
    correctAnswer: 1,
    category: 'Astronomy',
  },
  {
    text: "Who is known as the 'Father of Geometry'?",
    options: ['Pythagoras', 'Archimedes', 'Euclid', 'Aristotle'],
    correctAnswer: 2,
    category: 'Mathematics',
  },
  {
    text: 'What is the longest river in the world?',
    options: [
      'Amazon River',
      'Nile River',
      'Yangtze River',
      'Mississippi River',
    ],
    correctAnswer: 1,
    category: 'Geography',
  },
  {
    text: 'What is the boiling point of water at sea level?',
    options: ['90°C', '95°C', '100°C', '105°C'],
    correctAnswer: 2,
    category: 'Science',
  },
  {
    text: "Who wrote 'Pride and Prejudice'?",
    options: ['Jane Austen', 'Emily Brontë', 'Charles Dickens', 'Mark Twain'],
    correctAnswer: 0,
    category: 'Literature',
  },
  {
    text: 'Which planet has the most moons?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 3,
    category: 'Astronomy',
  },
]

mongoose
  .connect('mongodb://localhost:27017/QuizApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('MongoDB connected')
    await Question.insertMany(questions)
    console.log('25 questions have been inserted')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err)
  })
