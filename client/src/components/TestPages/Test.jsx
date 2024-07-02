import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";

const App = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/get-test/${testId}`)
      .then((response) => {
        setTest(response.data.test);
        setQuestions(response.data.test.questions || []);
      })
      .catch((err) => {
        console.error("Error fetching test data:", err);
      });
  }, [testId]);

  useEffect(() => {
    if (questions.length > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 1) {
            return prevTimeLeft - 1;
          } else {
            handleTimeUp();
            return 10;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [questions, currentQuestionIndex]);

  const handleTimeUp = () => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[currentQuestionIndex].givenAnswer === undefined) {
      updatedQuestions[currentQuestionIndex].givenAnswer = null;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setQuestions(updatedQuestions);
    } else {
      handleSubmit();
    }
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].givenAnswer = optionIndex;
    setQuestions(updatedQuestions);
    console.log(updatedQuestions);
    console.log(`Question ${questionIndex} selected option: ${optionIndex}`);
  };

  const handleNextQuestion = () => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[currentQuestionIndex].givenAnswer === undefined) {
      updatedQuestions[currentQuestionIndex].givenAnswer = null;
    }
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
    setTimeLeft(10);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    console.log({ testId, questions });
    axios
      .post("/submit-test", { testId, questions })
      .then((response) => {
        console.log(response.data.newTestResult._id);
        navigate(`/submit-success/${response.data.newTestResult._id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!test) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{test.subject}</h1>
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <div className="space-y-4">
          <div className="p-4 bg-white rounded shadow">
            <p className="text-lg mb-2">
              {questions[currentQuestionIndex]?.text ||
                "No question text available"}
            </p>
            <div className="pl-5">
              {questions[currentQuestionIndex]?.options?.map(
                (option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      id={`question-${currentQuestionIndex}-option-${optionIndex}`}
                      value={option}
                      checked={
                        questions[currentQuestionIndex].givenAnswer ===
                        optionIndex
                      }
                      onChange={() =>
                        handleOptionChange(currentQuestionIndex, optionIndex)
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor={`question-${currentQuestionIndex}-option-${optionIndex}`}
                      className="text-md"
                    >
                      {option}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <p className="text-lg font-bold">Time left: {timeLeft} seconds</p>
          {currentQuestionIndex < questions.length - 1 && (
            <button onClick={handleNextQuestion}>Next</button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleSubmit}>Submit</button>
          )}
        </div>
      ) : (
        <p className="text-lg">No more questions available.</p>
      )}
    </div>
  );
};

export default App;
