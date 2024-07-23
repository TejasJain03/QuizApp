import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios"; // Adjust the import path according to your project structure
import Navbar from "../Navbar";

export default function GivenTestDetails() {
  const { testResultId } = useParams();
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestResult = async () => {
      try {
        const response = await axios.get(`/given-test-details/${testResultId}`);
        setTestResult(response.data.testResult);
      } catch (error) {
        console.error("Error fetching test details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResult();
  }, [testResultId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!testResult) {
    return <div className="flex items-center justify-center min-h-screen">Test result not found.</div>;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#f0f4f8] p-6">
        <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#003459]">Test Details</h1>
          <div className="p-6 bg-[#e3f2fd] rounded-lg space-y-4">
            <h2 className="text-2xl font-semibold">{testResult.testId.subject}</h2>
            <p className="text-md text-gray-800">
              <span className="font-bold">Date:</span> {new Date(testResult.date).toLocaleDateString()}
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-md text-gray-800 font-bold">Score:</span>
              <span className={`text-lg font-bold px-4 py-2 rounded-full ${testResult.score >= 5 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {testResult.score}
              </span>
            </div>
            <p className="text-md text-gray-800">
              <span className="font-bold">Teacher:</span> {testResult.testId.createdBy.name} ({testResult.testId.createdBy.email})
            </p>
            <div className="mt-4">
              <h3 className="text-lg font-bold text-[#003459] mb-2">Questions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testResult.questions.map((question, index) => (
                  <div key={question.questionId._id} className="bg-white p-4 rounded-lg shadow-md">
                    <h4 className="text-md font-semibold mb-2">Q{index + 1}: {question.questionId.text}</h4>
                    <p className="text-sm text-gray-800 mb-1">
                      <span className="font-bold">Selected Answer:</span> {question.questionId.options[question.givenAnswer] ? question.questionId.options[question.givenAnswer] : "NA"}
                    </p>
                    <p className="text-sm text-gray-800 font-bold">
                      <span className="text-green-600">Correct Answer:</span> {question.questionId.options[question.questionId.correctAnswer]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
