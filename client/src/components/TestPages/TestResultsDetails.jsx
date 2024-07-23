import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ExcelJS from "exceljs";
import Navbar from "../Navbar"; // Adjust the import path according to your project structure

export default function TestResultsDetails() {
  const { testId } = useParams();
  const [testResults, setTestResults] = useState([]);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const response = await axios.get(`/test-results/${testId}`);
        setTestResults(response.data.testResults);
        const response2 = await axios.get(`/get-test/${testId}`);
        setTest(response2.data.test);
      } catch (error) {
        console.error("Error fetching test results:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestResults();
  }, [testId]);

  const downloadExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Test Results");

    worksheet.columns = [
      { header: "Student Name", key: "student", width: 25 },
      { header: "Date", key: "date", width: 15 },
      { header: "Score", key: "score", width: 10 },
      { header: "Number of Questions", key: "questions", width: 20 },
    ];

    testResults.forEach((result) => {
      worksheet.addRow({
        date: new Date(result.date).toLocaleDateString(),
        score: result.score,
        questions: result.questions.length,
        student: result.user ? result.user.name : "Loading...",
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${test?.subject}_${test?.date?.slice(0, 10)}.xlsx`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0f2f5] to-[#e2e8f0]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-[#00a9e8] to-[#007ea7] text-white">
            <h1 className="text-4xl font-bold mb-4 text-center">
              Test Results
            </h1>
            <div className="text-center">
              <button
                onClick={downloadExcel}
                className="bg-white text-[#007ea7] font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#007ea7] focus:ring-offset-2"
              >
                Download Results
              </button>
            </div>
          </div>
          <div className="p-6 overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl">
              <thead>
                <tr>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 tracking-wider">
                    Date
                  </th>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 tracking-wider">
                    Score
                  </th>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 tracking-wider">
                    Number of Questions
                  </th>
                  <th className="py-3 px-4 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 tracking-wider">
                    Student Name
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-4 border-b border-gray-200 text-center text-gray-600"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : testResults.length > 0 ? (
                  testResults.map((result) => (
                    <tr key={result._id} className="hover:bg-gray-100 transition-colors duration-200">
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-800">
                        {new Date(result.date).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-800">
                        {result.score}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-800">
                        {result.questions.length}
                      </td>
                      <td className="py-3 px-4 border-b border-gray-200 text-gray-800">
                        {result.user ? result.user.name : "Loading..."}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="py-3 px-4 border-b border-gray-200 text-center text-gray-600"
                    >
                      No test results found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
