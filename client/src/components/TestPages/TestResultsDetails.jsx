import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";

export default function TestResultsDetails() {
  const { testId } = useParams();
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axios.get(`/test-results/${testId}`);
        setTestResults(response.data.testResults);
      } catch (error) {
        console.error("Error fetching test results:", error);
      }
    };

    fetchTestResults();
  }, [testId]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Test Results</h1>
      {testResults.map((result) => (
        <div key={result._id} className="bg-white rounded-lg shadow-md p-4 mb-4">
          <p className="text-lg mb-2">
            Date: {new Date(result.date).toLocaleDateString()}
          </p>
          <p className="text-lg mb-2">Score: {result.score}</p>
          <p className="text-lg mb-2">Number of Questions: {result.questions.length}</p>
          <p className="text-lg font-bold mb-1">Student Details: {result.user ? result.user.name : "Loading..."}</p>
        </div>
      ))}
    </div>
  );
}
