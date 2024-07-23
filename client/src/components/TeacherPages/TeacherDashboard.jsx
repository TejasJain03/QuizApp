import { useState, useEffect } from "react";
import axios from "../axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchTests();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/all-students");
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error.response || error.message);
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
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#cce7ff] p-8">
        <h1 className="text-5xl font-extrabold mb-8 text-center text-[#003459]">
          Teacher Dashboard
        </h1>
        <div className="flex flex-col lg:flex-row lg:space-x-12 space-y-8 lg:space-y-0">
          <div className="flex-1 bg-gradient-to-br from-[#ffffff] to-[#f8f9fa] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-4xl font-bold mb-6 text-[#003459]">Students</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#007ea7] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr
                      key={student._id}
                      className="border-b border-gray-200 hover:bg-[#e0f7fa] transition-colors duration-300"
                    >
                      <td className="py-4 px-6">{student.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex-1 bg-gradient-to-br from-[#ffffff] to-[#f8f9fa] p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
            <h2 className="text-4xl font-bold mb-6 text-[#003459]">Tests</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-[#007ea7] text-white">
                  <tr>
                    <th className="py-3 px-6 text-left">Subject</th>
                    <th className="py-3 px-6 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tests.map((test) => (
                    <tr
                      key={test._id}
                      className="border-b border-gray-200 hover:bg-[#e0f7fa] transition-colors duration-300"
                    >
                      <td className="py-4 px-6">{test.subject}</td>
                      <td className="py-4 px-6">
                        <button
                          className="bg-gradient-to-br from-[#00a9e8] to-[#007ea7] text-white font-bold py-2 px-4 rounded-lg hover:bg-[#003459] transition-all duration-300"
                          onClick={() => navigate(`/test-results/${test._id}`)}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/generate-test"
            className="bg-gradient-to-br from-[#00a9e8] to-[#007ea7] text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:from-[#007ea7] hover:to-[#00a9e8] transition-all duration-300"
          >
            Generate Test
          </Link>
        </div>
      </div>
    </>
  );
};

export default TeacherDashboard;
