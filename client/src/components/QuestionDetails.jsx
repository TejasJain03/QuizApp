/* eslint-disable react/prop-types */
export default function QuestionDetails({ question, questionNumber }) {
  return (
    <li key={question.questionId._id} className="mb-4">
      <p className="font-semibold">
        Question {questionNumber}: {question.questionId.text}
      </p>
      <ul className="pl-5">
        {question.questionId.options.map((option, optionIndex) => (
          <li key={optionIndex}>
            <span className="text-md">
              {`Option ${optionIndex + 1}: ${option}`}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-md mt-2">
        Given Answer:{" "}
        {question.givenAnswer !== null
          ? `Option ${question.givenAnswer + 1}`
          : "Not answered"}
      </p>

      <p
        className={`text-md font-bold ${
          question.givenAnswer === null
            ? "text-gray-600"
            : question.correct
            ? "text-green-600"
            : "text-red-600"
        }`}
      >
        {question.givenAnswer === null
          ? "Not Attempted"
          : question.correct
          ? "Correct"
          : "Wrong"}
      </p>
    </li>
  );
}
