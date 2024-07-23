import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

export default function ConfirmStartTest() {
  const { testId } = useParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (e) => {
    setIsAgreed(e.target.checked);
  };

  const handleStartTest = () => {
    if (isAgreed) {
      navigate(`/test/${testId}`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[90vh] bg-[#f0f4f8] p-6 flex items-center justify-center">
        <div className="container max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#003459]">
            Confirm Start Test
          </h1>
          <p className="text-gray-700 mb-6 text-center">
            Before you start the test, please review and agree to the following
            rules:
          </p>
          <div className="space-y-4 mb-6">
            <ul className="list-disc pl-5 text-gray-700">
              <li>Ensure you have a stable internet connection.</li>
              <li>Do not navigate away from this page during the test.</li>
              <li>Complete the test in one sitting without interruptions.</li>
              <li>
                Adhere to the academic integrity policies of your institution.
              </li>
            </ul>
          </div>
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={isAgreed}
              onChange={handleAgreeChange}
              className="form-checkbox h-5 w-5 text-[#007ea7]"
            />
            <label htmlFor="agree" className="ml-2 text-gray-700">
              I agree to the above rules
            </label>
          </div>
          <button
            onClick={handleStartTest}
            className={`w-full bg-[#007ea7] text-white font-bold py-3 rounded-lg transition-transform transform ${
              isAgreed ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
            }`}
            disabled={!isAgreed}
          >
            Start Test
          </button>
        </div>
      </div>
    </>
  );
}
