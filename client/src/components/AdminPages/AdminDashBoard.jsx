import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import Navbar from "../Navbar";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("teachers");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/all-teachers");
      setTeachers(response.data.teachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/all-students");
      setStudents(response.data.students);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "teachers") {
      fetchTeachers();
    } else if (tab === "students") {
      fetchStudents();
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen p-8  bg-gradient-to-br from-[#f0f4f8] to-[#cce7ff]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold mb-10 text-center text-[#003459]">Admin Dashboard</h1>
          <div className="flex justify-center mb-12 space-x-8">
            <button
              onClick={() => handleTabChange("teachers")}
              className={`p-3 rounded-xl font-semibold transition-all ${
                activeTab === "teachers"
                  ? "bg-[#00a9e8] text-white shadow-lg scale-105"
                  : "bg-white text-[#007ea7] shadow-md"
              }`}
            >
              Teachers
            </button>
            <button
              onClick={() => handleTabChange("students")}
              className={`p-3 rounded-xl font-semibold transition-all ${
                activeTab === "students"
                  ? "bg-[#00a9e8] text-white shadow-lg scale-105"
                  : "bg-white text-[#007ea7] shadow-md"
              }`}
            >
              Students
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeTab === "teachers" && (
              <div className="col-span-1 sm:col-span-2 bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-6 text-[#003459]">Teachers</h2>
                {teachers.length > 0 ? (
                  <ul className="text-gray-800 space-y-4">
                    {teachers.map((teacher) => (
                      <li key={teacher._id} className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg">{teacher.name}</span>
                          <span className="text-gray-600">{teacher.email}</span>
                        </div>
                        <button
                          className="bg-[#007ea7] text-white font-bold py-2 px-5 rounded-lg hover:bg-[#003459] transition"
                          onClick={() => handleEdit(teacher._id)}
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No teachers found.</p>
                )}
              </div>
            )}
            {activeTab === "students" && (
              <div className="col-span-1 sm:col-span-2 bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <h2 className="text-3xl font-bold mb-6 text-[#003459]">Students</h2>
                {students.length > 0 ? (
                  <ul className="text-gray-800 space-y-4">
                    {students.map((student) => (
                      <li key={student._id} className="flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-semibold text-lg">{student.name}</span>
                          <span className="text-gray-600">{student.email}</span>
                        </div>
                        <button
                          className="bg-[#007ea7] text-white font-bold py-2 px-5 rounded-lg hover:bg-[#003459] transition"
                          onClick={() => handleEdit(student._id)}
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No students found.</p>
                )}
              </div>
            )}
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 text-[#003459]">Add User</h2>
              <p className="text-gray-800 mb-6">
                Add a new user, such as a teacher or student, to the system.
              </p>
              <Link
                to="/admin/add-user"
                className="bg-[#007ea7] text-white font-bold py-2 px-5 rounded-lg block text-center hover:bg-[#003459] transition"
              >
                Add User
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 text-[#003459]">Add Role</h2>
              <p className="text-gray-800 mb-6">Add a new role to the system.</p>
              <Link
                to="/admin/add-role"
                className="bg-[#007ea7] text-white font-bold py-2 px-5 rounded-lg block text-center hover:bg-[#003459] transition"
              >
                Add Role
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 text-[#003459]">View Questions</h2>
              <p className="text-gray-800 mb-6">View and manage all the questions in the system.</p>
              <Link
                to="/admin/view-questions"
                className="bg-[#007ea7] text-white font-bold py-2 px-5 rounded-lg block text-center hover:bg-[#003459] transition"
              >
                View Questions
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-3xl font-bold mb-6 text-[#003459]">View Tests</h2>
              <p className="text-gray-800 mb-6">View and manage all the tests in the system.</p>
              <Link
                to="/admin/view-tests"
                className="bg-[#007ea7] text-white font-bold py-2 px-5 rounded-lg block text-center hover:bg-[#003459] transition"
              >
                View Tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
