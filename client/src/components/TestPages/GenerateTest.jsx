import { useState, useEffect } from "react";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export default function GenerateTest() {
  const [date, setDate] = useState("");
  const [subject, setSubject] = useState("");
  const [allowedRoles, setAllowedRoles] = useState([]);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  // Fetch roles from API when the component mounts
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("/get-all-roles");
        setRoles(response.data.roles);
      } catch (error) {
        console.error("Error fetching roles:", error.response || error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testData = {
      date,
      subject,
      allowedRoles: allowedRoles.map((role) => parseInt(role)),
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
      setAllowedRoles(allowedRoles.filter((r) => r !== role));
    } else {
      setAllowedRoles([...allowedRoles, role]);
    }
  };

  // Function to get current date in 'YYYY-MM-DD' format
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = now.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f4f8] to-[#e3f2fd] p-6 flex items-center justify-center">
      <div className="container max-w-lg bg-white p-8 rounded-lg shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#003459]">Generate Test</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 text-lg font-semibold mb-2">
              Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg bg-[#e8f4f8] focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              min={getCurrentDate()} 
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block text-gray-700 text-lg font-semibold mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg bg-[#e8f4f8] focus:outline-none focus:ring-2 focus:ring-[#007ea7]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-semibold mb-2">Allowed Roles</label>
            <div className="space-y-3">
              {roles.map((role) => (
                <label key={role._id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={role.identifier}
                    checked={allowedRoles.includes(role.identifier.toString())}
                    onChange={() => handleRoleChange(role.identifier.toString())}
                    className="form-checkbox h-6 w-6 text-[#007ea7] focus:ring-2 focus:ring-[#007ea7]"
                  />
                  <span className="ml-3 text-lg">{role.roleName}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#007ea7] to-[#00a9e8] text-white font-bold py-3 rounded-lg shadow-lg hover:from-[#005f8a] hover:to-[#007ea7] transition-all duration-300"
          >
            Generate Test
          </button>
        </form>
      </div>
    </div>
  );
}
