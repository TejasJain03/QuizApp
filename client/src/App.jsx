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
import ViewTests from "./components/AdminPages/ViewTests";
import ViewQuestions from "./components/AdminPages/ViewQuestions";
import AddQuestion from "./components/AddQuestion";
import AddRole from "./components/AdminPages/AddRole";
import NotFound from "./components/NotFound";
import EditQuestionForm from "./components/AdminPages/EditQuestion";
import ConfirmStartTest from "./components/TestPages/ConfirmStartTest";

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
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/admin/view-tests" element={<ViewTests />} />
          <Route path="/admin/view-questions" element={<ViewQuestions />} />
          <Route
            path="/giventestdetails/:testResultId"
            element={<GivenTestDetails />}
          />
          <Route path="/admin/add-user" element={<AddUser />} />
          <Route path="/admin/add-role" element={<AddRole />} />
          <Route path="/generate-test" element={<GenerateTest />} />
          <Route
            path="/test-results/:testId"
            element={<TestResultsDetails />}
          />
          <Route
            path="/confirmtaketest/:testId"
            element={<ConfirmStartTest />}
          />
          <Route
            path="/submit-success/:testResultId"
            element={<SubmitSuccess />}
          />
          <Route path="/admin/edit-user/:id" element={<EditUser />} />
          <Route path="/edit-question/:id" element={<EditQuestionForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
