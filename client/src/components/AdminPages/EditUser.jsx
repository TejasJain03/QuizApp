import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";
import Navbar from "../Navbar"; // Adjust the path as per your actual structure

const EditUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/get-user/${id}`);
        const userData = response.data.user;
        setFormData({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/update-user/${id}`, formData);
      console.log("User updated successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/delete-user/${id}`);
      console.log("User deleted successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!user) {
    return <p className="text-center text-[#003459]">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] flex flex-col">
      <Navbar /> {/* Reusable Navbar Component */}
      <div className="flex flex-col flex-grow items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-8 text-[#003459]">Edit User</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
        >
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-[#007ea7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-[#007ea7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="role"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-[#007ea7] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            >
              <option value="">Select role</option>
              <option value="1">Teacher</option>
              <option value="2">Student</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-[#00a9e8] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#007ea7] transition focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-1/2 bg-[#f87171] text-white font-semibold py-2 px-4 rounded-lg hover:bg-[#e11d48] transition focus:outline-none focus:ring-2 focus:ring-[#e11d48]"
            >
              Delete User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
