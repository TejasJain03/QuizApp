import { useState } from "react";
import axios from "../axios";
import Navbar from "../Navbar"

const AddRole = () => {
  const [roleName, setRoleName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/add-role", { name: roleName });
      console.log("Role added successfully:", response.data);
      setRoleName(""); // Clear the input field after successful submission
    } catch (error) {
      console.error("Error adding role:", error.response || error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] bg-gray-100 flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00171f]">
          Add Role
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="mb-6">
            <label htmlFor="roleName" className="block text-gray-700 mb-2">
              Role Name
            </label>
            <input
              type="text"
              id="roleName"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#007ea7] text-white font-bold py-3 rounded-md transition-colors duration-300 hover:bg-[#005f80]"
          >
            Add Role
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRole;
