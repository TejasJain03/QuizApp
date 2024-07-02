import { useEffect, useState } from "react";
import axios from "../axios";
import { useNavigate, Link } from "react-router-dom";

const StudentDashboard = () => {
  const [tests, setTests] = useState([]);
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
  }, []);

  const isTestDateValid = (testDate) => {
    const currentDate = new Date();
    const parsedTestDate = new Date(testDate);
    return currentDate < parsedTestDate;
  };
  const handleLogout = () => {
    axios
      .get("/logout")
      .then((response) => {
        console.log(response);
        navigate('/login')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tests.map((test) => (
          <div
            key={test._id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{test.subject}</h2>
            <p className="text-gray-600 mb-4">
              Date: {new Date(test.date).toLocaleDateString()}
            </p>
            <p className="text-gray-800">
              Number of Questions: {test.questions.length}
            </p>
            <button
              className={`bg-blue-600 text-white font-bold p-2 rounded-md ${
                !isTestDateValid(test.date)
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => {
                navigate(`/test/${test._id}`);
              }}
              disabled={!isTestDateValid(test.date)}
            >
              {isTestDateValid(test.date) ? "Give Test" : "Test Expired"}
            </button>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <Link
          to="/giventests"
          className="bg-blue-600 text-white font-bold p-2 rounded-md"
        >
          View Given Tests
        </Link>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white font-bold p-2 rounded-md block text-center"
      >
        Logout
      </button>
    </div>
  );
};

export default StudentDashboard;
