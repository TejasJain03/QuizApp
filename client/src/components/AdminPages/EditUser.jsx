import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../axios";

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
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Edit User</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded-md mr-2"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="w-full bg-red-600 text-white font-bold py-2 rounded-md"
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
