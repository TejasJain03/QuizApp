import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const GivenTests = () => {
  const [givenTests, setGivenTests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/given-tests") // Adjust the endpoint if necessary
      .then((response) => {
        setGivenTests(response.data.testResults || []);
      })
      .catch((err) => {
        console.error("Error fetching given tests:", err);
      });
  }, []);

  const handleViewDetails = (testId) => {
    console.log(`View details for test ID: ${testId}`);
    navigate(`/giventestdetails/${testId}`)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Given Tests</h1>
      {givenTests.length > 0 ? (
        <ul className="space-y-4">
          {givenTests.map((testResult) => (
            <li key={testResult._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-xl font-bold">{testResult.testId.subject}</h2>
              <p className="text-md">
                Date: {new Date(testResult.date).toLocaleDateString()}
              </p>
              <p className="text-md">Score: {testResult.score}</p>
              <button
                onClick={() => handleViewDetails(testResult._id)}
                className="mt-2 px-4 py-2 font-bold bg-blue-500 text-white rounded"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No given tests found.</p>
      )}
    </div>
  );
};

export default GivenTests;
