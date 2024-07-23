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
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9] text-[#003459]">
        <svg
          className="animate-spin h-5 w-5 mr-3 text-[#007ea7]"
          viewBox="0 0 24 24"
        ></svg>
        Loading...
      </div>
    );
  }

  if (!testResult) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#f9f9f9] text-[#003459]">
        Test result not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col items-center justify-center">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#003459]">
          Successfully Submitted
        </h1>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-[#00171f]">
            Test Results
          </h2>
          <div className="mb-4">
            <p className="text-lg text-[#003459] mb-2">
              <span className="font-semibold">Subject:</span>{" "}
              {testResult.testId.subject}
            </p>
            <p className="text-lg text-[#003459] mb-2">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(testResult.date).toLocaleDateString()}
            </p>
            <p className="text-lg text-[#003459] mb-2">
              <span className="font-semibold">Score:</span> {testResult.score}
            </p>
          </div>
          <Link
            to="/dashboard"
            className="block bg-[#007ea7] text-white font-bold py-3 px-5 rounded-md text-center hover:bg-[#005f80] transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
