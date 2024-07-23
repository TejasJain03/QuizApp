import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../axios';
import Navbar from '../Navbar'; // Assuming you have a Navbar component

const EditQuestionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({
    text: '',
    options: ['', '', '', ''], // Default to 4 options
    correctAnswer: 0,
    category: '',
  });

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await axios.get(`/question/${id}`);
        setQuestion(response.data.question);
      } catch (error) {
        console.error('Error fetching question:', error);
      }
    };

    fetchQuestion();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestion({ ...question, [name]: value });
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...question.options];
    newOptions[index] = e.target.value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (index) => {
    setQuestion({ ...question, correctAnswer: index });
  };

  const addOption = () => {
    setQuestion({ ...question, options: [...question.options, ''] });
  };

  const removeOption = (index) => {
    const newOptions = question.options.filter((_, i) => i !== index);
    setQuestion({ ...question, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/update-question/${id}`, question);
      navigate('/view-questions');
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      <Navbar /> {/* Reusable Navbar Component */}
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#003459]">Edit Question</h1>
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="text" className="block text-sm font-medium text-[#003459] mb-2">
                Question Text:
              </label>
              <input
                type="text"
                id="text"
                name="text"
                value={question.text}
                onChange={handleInputChange}
                className="block w-full p-3 border border-[#007ea7] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007ea7] transition"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="options" className="block text-sm font-medium text-[#003459] mb-2">
                Options:
              </label>
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="text"
                    id={`option${index}`}
                    name={`option${index}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                    className="w-full p-3 border border-[#007ea7] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007ea7] transition"
                    required
                  />
                  <div className="ml-3 flex items-center">
                    <input
                      type="radio"
                      id={`correctAnswer${index}`}
                      name="correctAnswer"
                      value={index}
                      checked={question.correctAnswer === index}
                      onChange={() => handleCorrectAnswerChange(index)}
                      className="form-radio text-[#007ea7] focus:ring-[#007ea7]"
                    />
                    <label htmlFor={`correctAnswer${index}`} className="ml-2 text-sm text-[#003459]">
                      Correct
                    </label>
                    {question.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeOption(index)}
                        className="ml-2 text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="text-[#007ea7] hover:text-[#005f80] text-sm font-semibold"
              >
                Add Option
              </button>
            </div>
            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-[#003459] mb-2">
                Category:
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={question.category}
                onChange={handleInputChange}
                className="block w-full p-3 border border-[#007ea7] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#007ea7] transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#007ea7] text-white font-bold py-2 px-4 rounded-md hover:bg-[#005f80] transition"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionForm;
