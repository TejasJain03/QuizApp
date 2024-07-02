import { useState } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function GenerateTest() {
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [allowedRoles, setAllowedRoles] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testData = {
      date,
      subject,
      allowedRoles: allowedRoles.map(role => parseInt(role)), 
    };
    try {
      const response = await axios.post("/generate-test", testData);
      console.log("Test generated successfully:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error generating test:", error.response || error.message);
    }
  };

  const handleRoleChange = (role) => {
    if (allowedRoles.includes(role)) {
      setAllowedRoles(allowedRoles.filter(r => r !== role));
    } else {
      setAllowedRoles([...allowedRoles, role]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Generate Test</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label htmlFor="date" className="block text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-gray-700 mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Allowed Roles</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                value="1"
                checked={allowedRoles.includes("1")}
                onChange={() => handleRoleChange("1")}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Teacher</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                value="2"
                checked={allowedRoles.includes("2")}
                onChange={() => handleRoleChange("2")}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">Student</span>
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 rounded-md"
        >
          Generate Test
        </button>
      </form>
    </div>
  );
}
