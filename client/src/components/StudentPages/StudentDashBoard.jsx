import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const StudentDashboard = () => {
  const [tests, setTests] = useState([]);
  const [givenTests, setGivenTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/get-all-tests")
      .then((response) => {
        setTests(response.data.tests);
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get("/given-tests")
      .then((response) => {
        setGivenTests(response.data.testResults || []);
      })
      .catch((err) => {
        console.error("Error fetching given tests:", err);
      });
  }, []);

  const isTestDateValid = (testDate) => {
    const currentDate = new Date();
    const parsedTestDate = new Date(testDate);
    return currentDate < parsedTestDate;
  };

  const handleViewDetails = (testId) => {
    navigate(`/giventestdetails/${testId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-[#f0f4f8] to-[#cce7ff] p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-[#003459]">
              Student Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl">
              <h2 className="text-4xl font-bold mb-6 text-[#003459]">
                Available Tests
              </h2>
              {tests.length > 0 ? (
                <div className="space-y-4">
                  {tests.map((test) => (
                    <div
                      key={test._id}
                      className="bg-[#f7f9fc] p-4 rounded-lg shadow-md relative overflow-hidden group"
                    >
                      <h3 className="text-2xl font-semibold text-[#003459] mb-2 group-hover:text-[#007ea7]">
                        {test.subject}
                      </h3>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(test.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-800 mb-4">
                        <span className="font-semibold">Questions:</span>{" "}
                        {test.questions.length}
                      </p>
                      <button
                        className={`absolute bottom-4 left-4 bg-[#007ea7] text-white font-bold py-2 px-4 rounded-md transform transition-transform duration-300 ${
                          isTestDateValid(test.date)
                            ? "hover:scale-105"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                        onClick={() => {
                          navigate(`/confirmtaketest/${test._id}`);
                        }}
                        disabled={!isTestDateValid(test.date)}
                      >
                        {isTestDateValid(test.date) ? "Take Test" : "Expired"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No tests available</p>
              )}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 hover:shadow-xl">
              <h2 className="text-4xl font-bold mb-6 text-[#003459]">
                Given Tests
              </h2>
              {givenTests.length > 0 ? (
                <div className="space-y-4">
                  {givenTests.map((testResult) => (
                    <div
                      key={testResult._id}
                      className="bg-[#f7f9fc] p-4 rounded-lg shadow-md relative overflow-hidden group"
                    >
                      <h3 className="text-2xl font-semibold text-[#003459] mb-2 group-hover:text-[#007ea7]">
                        {testResult.testId.subject}
                      </h3>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Date:</span>{" "}
                        {new Date(testResult.date).toLocaleDateString()}
                      </p>
                      <p className="text-gray-800 mb-4">
                        <span className="font-semibold">Score:</span>{" "}
                        {testResult.score}
                      </p>
                      <button
                        className="absolute bottom-4 left-4 bg-[#007ea7] text-white font-bold py-2 px-4 rounded-md transform transition-transform duration-300 hover:scale-105"
                        onClick={() => handleViewDetails(testResult._id)}
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-700">No given tests found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
