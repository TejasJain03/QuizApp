import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("teachers");
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    axios
      .get("/logout")
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-user/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleTabChange("teachers")}
          className={`p-2 rounded ${
            activeTab === "teachers"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Teachers
        </button>
        <button
          onClick={() => handleTabChange("students")}
          className={`p-2 rounded ${
            activeTab === "students"
              ? "bg-blue-600 text-white"
              : "bg-white text-blue-600"
          }`}
        >
          Students
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === "teachers" && (
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Teachers</h2>
            {teachers.length > 0 ? (
              <ul className="text-gray-800 mb-4">
                {teachers.map((teacher) => (
                  <li key={teacher._id} className="mb-2 flex justify-between">
                    <div>
                      {teacher.name} - {teacher.email}
                    </div>
                    <div>
                      <button
                        className="bg-blue-600 text-white font-bold py-1 px-4 rounded-md mr-2"
                        onClick={() => handleEdit(teacher._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No teachers found.</p>
            )}
          </div>
        )}
        {activeTab === "students" && (
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-2">Students</h2>
            {students.length > 0 ? (
              <ul className="text-gray-800 mb-4">
                {students.map((student) => (
                  <li key={student._id} className="mb-2 flex justify-between">
                    <div>
                      {student.name} - {student.email}
                    </div>
                    <div>
                      <button
                        className="bg-blue-600 text-white font-bold py-1 px-4 rounded-md mr-2"
                        onClick={() => handleEdit(student._id)}
                      >
                        Edit
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students found.</p>
            )}
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-xl font-semibold mb-2">Add User</h2>
          <p className="text-gray-800 mb-4">
            Add a new user, such as a teacher or student, to the system.
          </p>
          <Link
            to="/admin/add-user"
            className="bg-blue-600 text-white font-bold p-2 rounded-md block text-center"
          >
            Add User
          </Link>
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => navigate("/admin/view-questions")}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-md mr-2"
        >
          View Questions
        </button>
        <button
          onClick={() => navigate("/admin/view-tests")}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-md"
        >
          View Tests
        </button>
      </div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white font-bold p-2 rounded-md block text-center mt-4"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
