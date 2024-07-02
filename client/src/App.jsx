import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminPages/AdminDashBoard";
import { AuthProvider } from "./components/AuthProvider";
import Dashboard from "./components/DashBoard";
import Login from "./components/Login";
import Test from "./components/TestPages/Test";
import GivenTests from "./components/TestPages/GivenTests";
import GivenTestDetails from "./components/TestPages/GivenTestDetails";
import AddUser from "./components/AdminPages/AddUser";
import SubmitSuccess from "./components/TestPages/SubmitSuccess";
import GenerateTest from "./components/TestPages/GenerateTest";
import EditUser from "./components/AdminPages/EditUser";
import TestResultsDetails from "./components/TestPages/TestResultsDetails";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test/:testId" element={<Test />} />
          <Route path="/giventests" element={<GivenTests />} />
          <Route
            path="/giventestdetails/:testResultId"
            element={<GivenTestDetails />}
          />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/teacher/generate-test" element={<GenerateTest />} />
          <Route
            path="/teacher/test-results/:testId"
            element={<TestResultsDetails />}
          />
          <Route
            path="/submit-success/:testResultId"
            element={<SubmitSuccess />}
          />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
