// src/components/NotFound.jsx
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-4">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
