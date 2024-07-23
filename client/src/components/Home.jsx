import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-400">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#007ea7] rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#00a9e8] rounded-full opacity-30 animate-pulse"></div>
        <h1 className="text-5xl font-extrabold mb-8 text-[#003459] z-10 relative">
          Welcome to the Quiz App
        </h1>
        <p className="text-lg mb-12 text-gray-600 z-10 relative">
          The ultimate platform for interactive learning and assessment
        </p>
        <div className="space-y-6 relative z-10">
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="w-full py-3 px-6 rounded-full bg-[#007ea7] text-white hover:bg-[#004e98] transition-all transform hover:scale-105 shadow-md">
              Admin Login
            </button>
          </Link>
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="w-full py-3 px-6 rounded-full bg-[#00a9e8] text-white hover:bg-[#007ea7] transition-all transform hover:scale-105 shadow-md">
              Teacher Login
            </button>
          </Link>
          <Link to={user ? "/dashboard" : "/login"}>
            <button className="w-full py-3 px-6 rounded-full bg-[#ff6700] text-white hover:bg-[#e05e00] transition-all transform hover:scale-105 shadow-md">
              Student Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
