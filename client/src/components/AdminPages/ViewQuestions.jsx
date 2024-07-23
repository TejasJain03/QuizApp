import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "../Navbar"; // Adjust the path as per your actual structure

const ViewQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("/all-questions");
        setQuestions(response.data.questions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-question/${id}`);
  };

  const handleAdd = () => {
    navigate("/add-question");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <Navbar /> {/* Reusable Navbar Component */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#00171f]">
          Questions
        </h1>
        <div className="flex justify-end mb-8">
          <button
            onClick={handleAdd}
            className="bg-[#007ea7] text-white font-bold py-3 px-6 rounded-full hover:bg-[#005f80] transition-transform transform hover:scale-105 shadow-lg"
          >
            Add Question
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {questions.length > 0 ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-semibold text-xl text-[#003459]">
                      {question.text}
                    </div>
                    <button
                      onClick={() => handleEdit(question._id)}
                      className="bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 shadow-md"
                    >
                      Edit
                    </button>
                  </div>
                  <ul className="list-disc pl-5 mb-4">
                    {question.options.map((option, index) => (
                      <li
                        key={index}
                        className={`${
                          index === question.correctAnswer
                            ? "font-bold text-green-600"
                            : ""
                        }`}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                  <div className="text-sm text-gray-500">
                    Category: {question.category}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-lg font-semibold">
              No questions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewQuestions;
