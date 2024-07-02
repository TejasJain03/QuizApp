import { useAuth } from "./AuthProvider";
import AdminDashboard from "../components/AdminDashBoard";
import StudentDashboard from "../components/StudentDashBoard";
import TeacherDashBoard from "./TeacherDashboard";

const Dashboard = () => {
  const { user } = useAuth();

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
