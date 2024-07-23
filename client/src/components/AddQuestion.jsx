import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "./axios";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
    text: "",
    category: "",
    options: [""],
    correctAnswer: 0,
  });
  const navigate = useNavigate();

  const handleQuestionChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    setQuestion({ ...question, options: updatedOptions });
  };

  const handleAddOption = () => {
    setQuestion({ ...question, options: [...question.options, ""] });
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = question.options.filter((_, i) => i !== index);
    setQuestion({ ...question, options: updatedOptions });
  };

  const handleCorrectAnswerChange = (index) => {
    setQuestion({ ...question, correctAnswer: index });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/add-question", question);
    console.log(question);
    navigate("/view-questions");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[90vh] bg-gradient-to-br from-gray-100 to-gray-300 p-4 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-lg"
        >
          <h1 className="text-3xl font-extrabold mb-6 text-center text-[#003459]">
            Add Question
          </h1>
          <div className="mb-6">
            <label
              htmlFor="text"
              className="block text-gray-700 font-semibold mb-2"
            >
              Question Text
            </label>
            <input
              type="text"
              id="text"
              name="text"
              value={question.text}
              onChange={handleQuestionChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold mb-2"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={question.category}
              onChange={handleQuestionChange}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-4">
              Options
            </label>
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center mb-3">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="ml-3 bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 focus:outline-none"
                >
                  Remove
                </button>
                <label className="ml-3 flex items-center">
                  <input
                    type="radio"
                    name="correctAnswer"
                    checked={question.correctAnswer === index}
                    onChange={() => handleCorrectAnswerChange(index)}
                    className="form-radio text-green-600 focus:border-green-500 focus:outline-none"
                  />
                  <span className="ml-2 text-gray-700">Correct</span>
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none"
            >
              Add Option
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-105 shadow-md"
          >
            Add Question
          </button>
        </form>
      </div>
    </>
  );
};

export default AddQuestion;
