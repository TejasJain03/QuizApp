import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "../Navbar"; // Ensure you have the Navbar component

const ViewTest = () => {
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get("/all-tests");
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    };

    fetchTests();
  }, []);

  const handleViewDetails = (id) => {
    navigate(`/test-results/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar /> {/* Reusable Navbar Component */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-[#00171f]">
          Tests
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tests.length > 0 ? (
            tests.map((test) => (
              <div
                key={test._id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
              >
                <h2 className="text-2xl font-semibold mb-2 text-[#003459]">
                  {test.subject}
                </h2>
                <p className="text-gray-700 mb-2">
                  Date: {new Date(test.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-2">
                  Number of Questions: {test.questions.length}
                </p>
                <p className="text-gray-700">
                  Tests Submitted: {test.testGiven.length}
                </p>
                <button
                  className="mt-4 bg-[#007ea7] text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-[#005f80] transition-colors duration-300"
                  onClick={() => handleViewDetails(test._id)}
                >
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-800 col-span-full">
              No tests found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewTest;
