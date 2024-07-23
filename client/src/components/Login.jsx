import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-teal-400">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#003459] rounded-tl-full"></div>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#003459]">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-3 border border-[#003459] rounded focus:outline-none focus:border-[#007ea7] placeholder-gray-500"
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-3 border border-[#003459] rounded focus:outline-none focus:border-[#007ea7] placeholder-gray-500"
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#00a9e8] text-white font-bold rounded hover:bg-[#007ea7] transition"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
