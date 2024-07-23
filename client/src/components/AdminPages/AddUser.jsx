import { useState } from "react";
import axios from "../axios"; // Adjust the import path according to your project structure
import Navbar from "../Navbar"; // Adjust the path as per your actual structure

const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [usn, setUsn] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [dept, setDept] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role: role === "1" ? 1 : role === "2" ? 2 : null,
      usn: role === "2" ? usn : undefined,
      semester: role === "2" ? semester : undefined,
      branch: role === "2" ? branch : undefined,
      empCode: role === "1" ? empCode : undefined,
      dept: role === "1" ? dept : undefined,
    };

    try {
      const response = await axios.post("/add-user", newUser);
      console.log("User added successfully:", response.data);
      console.log(newUser);
      // Optionally, redirect or show success message
    } catch (err) {
      console.error("Error adding user:", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex flex-col">
      <Navbar /> {/* Reusable Navbar Component */}
      {/* Main Content */}
      <div className="flex flex-col flex-grow items-center justify-center p-6">
        <h1 className="text-3xl font-extrabold mb-6 text-[#003459]">
          Add New User
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full"
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block text-[#003459] text-sm font-semibold mb-2"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
                // Clear additional fields when role changes
                if (e.target.value !== "2") {
                  setUsn("");
                  setSemester("");
                  setBranch("");
                }
                if (e.target.value !== "1") {
                  setEmpCode("");
                  setDept("");
                }
              }}
              className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            >
              <option value="">Select role</option>
              <option value="1">Teacher</option>
              <option value="2">Student</option>
            </select>
          </div>

          {/* Conditional fields for Student */}
          {role === "2" && (
            <>
              <div className="mb-5">
                <label
                  htmlFor="usn"
                  className="block text-[#003459] text-sm font-semibold mb-2"
                >
                  USN
                </label>
                <input
                  type="text"
                  id="usn"
                  value={usn}
                  onChange={(e) => setUsn(e.target.value)}
                  placeholder="Enter USN"
                  className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="semester"
                  className="block text-[#003459] text-sm font-semibold mb-2"
                >
                  Semester
                </label>
                <input
                  type="number"
                  id="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  placeholder="Enter semester"
                  className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="branch"
                  className="block text-[#003459] text-sm font-semibold mb-2"
                >
                  Branch
                </label>
                <input
                  type="text"
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="Enter branch"
                  className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
                  required
                />
              </div>
            </>
          )}

          {/* Conditional fields for Teacher */}
          {role === "1" && (
            <>
              <div className="mb-5">
                <label
                  htmlFor="empCode"
                  className="block text-[#003459] text-sm font-semibold mb-2"
                >
                  Employee Code
                </label>
                <input
                  type="text"
                  id="empCode"
                  value={empCode}
                  onChange={(e) => setEmpCode(e.target.value)}
                  placeholder="Enter employee code"
                  className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="dept"
                  className="block text-[#003459] text-sm font-semibold mb-2"
                >
                  Department
                </label>
                <input
                  type="text"
                  id="dept"
                  value={dept}
                  onChange={(e) => setDept(e.target.value)}
                  placeholder="Enter department"
                  className="w-full p-3 border border-[#003459] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
                  required
                />
              </div>
            </>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#007ea7] text-white font-semibold py-2 px-6 rounded-lg hover:bg-[#005f8a] transition focus:outline-none focus:ring-2 focus:ring-[#005f8a]"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
