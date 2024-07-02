import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === "students") {
      fetchStudents();
    } else if (activeTab === "tests") {
      fetchTests();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/all-students");
      setStudents(response.data.students);
    } catch (error) {
      console.error(
        "Error fetching students:",
        error.response || error.message
      );
    }
  };

  const fetchTests = async () => {
    try {
      const response = await axios.get("/all-tests");
      setTests(response.data.tests);
    } catch (error) {
      console.error("Error fetching tests:", error.response || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Teacher Dashboard</h1>
      <div className="flex justify-around mb-4">
        <button
          onClick={() => setActiveTab("students")}
          className={`p-2 rounded ${
            activeTab === "students"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Show All Students
        </button>
        <button
          onClick={() => setActiveTab("tests")}
          className={`p-2 rounded ${
            activeTab === "tests"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Show All Tests
        </button>
        <Link
          to="/teacher/generate-test"
          className="bg-blue-600 text-white font-bold p-2 rounded-md block text-center"
        >
          Generate Test
        </Link>
      </div>
      {activeTab === "students" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student._id} className="mb-2">
                {student.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "tests" && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Tests</h2>
          <ul>
            {tests.map((test) => (
              <li key={test._id} className="mb-2 w-full  flex justify-between">
                {test.subject}
                <button
                  className="bg-blue-600 text-white font-bold p-2 rounded-md block text-center"
                  onClick={() => {
                    navigate(`/teacher/test-results/${test._id}`);
                  }}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
