import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../axios";

export default function SubmitSuccess() {
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
      <h1 className="text-3xl font-bold mb-4">Successfully Submitted</h1>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-xl font-bold">Test Results</h2>
        <p className="text-md">Subject: {testResult.testId.subject}</p>
        <p className="text-md">Date: {new Date(testResult.date).toLocaleDateString()}</p>
        <p className="text-md">Score: {testResult.score}</p>
        <Link
          to="/dashboard"
          className="inline-block mt-4 bg-blue-600 text-white font-bold p-2 rounded-md text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
