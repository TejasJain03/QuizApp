import { useEffect } from "react";
import { useAuth } from "./AuthProvider";
import AdminDashboard from "./AdminPages/AdminDashBoard";
import StudentDashboard from "./StudentPages/StudentDashBoard";
import TeacherDashBoard from "./TeacherPages/TeacherDashboard";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  switch (user.role) {
    case 0:
      return <AdminDashboard />;
    case 1:
      return <TeacherDashBoard />;
    case 2:
      return <StudentDashboard />;
    default:
      return <div>No dashboard available for your role</div>;
  }
};

export default Dashboard;
