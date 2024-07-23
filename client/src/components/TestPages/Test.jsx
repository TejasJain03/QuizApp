import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../AuthProvider";

const TestTakingPage = () => {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20); // Display time for each question
  const navigate = useNavigate();
  const { user } = useAuth();

  // Fetch test and questions data
  useEffect(() => {
    axios
      .get(`/get-test/${testId}`)
      .then((response) => {
        const hasGiven = response.data.test.testGiven.includes(user._id);
        if (hasGiven) {
          navigate("/dashboard");
        } else {
          setTest(response.data.test);
          setQuestions(response.data.test.questions || []);
        }
      })
      .catch((err) => {
        console.error("Error fetching test data:", err);
      });
  }, [testId, user, navigate]);

  // Timer logic
  useEffect(() => {
    if (questions.length > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft > 1) {
            return prevTimeLeft - 1;
          } else {
            handleTimeUp();
            return 20; // Reset timer for next question
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
  };

  const handleNextQuestion = () => {
    const updatedQuestions = [...questions];
    if (updatedQuestions[currentQuestionIndex].givenAnswer === undefined) {
      updatedQuestions[currentQuestionIndex].givenAnswer = null;
    }
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
    setTimeLeft(20); // Reset timer
    setQuestions(updatedQuestions);
  };

  const handleSubmit = () => {
    axios
      .post("/submit-test", { testId, questions })
      .then((response) => {
        navigate(`/submit-success/${response.data.newTestResult._id}`);
      })
      .catch((err) => {
        console.error("Error submitting test:", err);
      });
  };

  // Disable keyboard interactions
  useEffect(() => {
    const disableKeyboard = (e) => {
      e.preventDefault();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Don't switch tabs!";
      } else {
        document.title = "Test Page";
      }
    };
    
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; 
    };

    // Add event listeners to disable keyboard
    document.addEventListener("keydown", disableKeyboard);
    document.addEventListener("keyup", disableKeyboard);
    document.addEventListener("keypress", disableKeyboard);
    
    // Add event listeners for tab and navigation
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Clean up event listeners
      document.removeEventListener("keydown", disableKeyboard);
      document.removeEventListener("keyup", disableKeyboard);
      document.removeEventListener("keypress", disableKeyboard);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f4f8]">
        <div className="w-12 h-12 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#f0f4f8]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#003459]">{test.subject}</h1>
        {questions.length > 0 && currentQuestionIndex < questions.length ? (
          <div className="space-y-6">
            <div className="p-6 bg-[#ffffff] border border-[#e2e8f0] rounded-lg shadow-lg">
              <p className="text-xl mb-4 font-medium text-[#003459]">
                {questions[currentQuestionIndex]?.text || "No question text available"}
              </p>
              <div className="space-y-4">
                {questions[currentQuestionIndex]?.options?.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name={`question-${currentQuestionIndex}`}
                      id={`question-${currentQuestionIndex}-option-${optionIndex}`}
                      value={option}
                      checked={questions[currentQuestionIndex].givenAnswer === optionIndex}
                      onChange={() => handleOptionChange(currentQuestionIndex, optionIndex)}
                      className="form-radio h-5 w-5 text-[#007ea7] focus:ring-0"
                    />
                    <label
                      htmlFor={`question-${currentQuestionIndex}-option-${optionIndex}`}
                      className="text-lg text-[#003459]"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <p className="text-lg font-semibold text-[#003459]">Time left: {timeLeft}s</p>
              <div className="flex space-x-4">
                {currentQuestionIndex < questions.length - 1 && (
                  <button
                    onClick={handleNextQuestion}
                    className="bg-[#007ea7] text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-[#005f8a] focus:outline-none focus:ring-2 focus:ring-[#005f8a]"
                  >
                    Next
                  </button>
                )}
                {currentQuestionIndex === questions.length - 1 && (
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded-md shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p className="text-lg text-center text-[#003459]">No more questions available.</p>
        )}
      </div>
    </div>
  );
};

export default TestTakingPage;
