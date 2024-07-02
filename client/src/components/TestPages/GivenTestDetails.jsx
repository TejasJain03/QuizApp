import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios"; // Adjust the import path according to your project structure
import QuestionDetails from "./QuestionDetails";

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
    return <div>Loading...</div>;
  }

  if (!testResult) {
    return <div>Test result not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Test Details</h1>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">{testResult.testId.subject}</h2>
        <p className="text-md">
          Date: {new Date(testResult.date).toLocaleDateString()}
        </p>
        <p className="text-md">Score: {testResult.score}</p>
        <div className="mt-4">
          <h3 className="text-lg font-bold">Questions</h3>
          <ul className="list-disc pl-5">
            {testResult.questions.map((question, index) => (
              <QuestionDetails
                key={question.questionId._id}
                question={question}
                questionNumber={index + 1}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
