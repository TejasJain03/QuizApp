import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import axios from "./axios";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-[#00171f] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          QuizApp
        </Link>
        <div>
          {user && (
            <button
              onClick={handleLogout}
              className="text-white h-14 hover:text-red-600 transition"
            >
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAATJJREFUSEvNVYENwjAMiz+BS4BP2CWwS4BLYJewT0I9NSgb60orJlFp2qQ2dmMnGWTlhZXx5T8IVHUjIkcR2YnIPnz37ukAXFNKLGbggE8ZKVsA57kzSYII/nRBbbj9A8Aj7jErZmPkzKrhvifKZcBbURYGEuBjRbKLSQdg+zVBSYWp6j2SXAE0Frsk0cUfzJFNJD2YVB8EPmUE53LAfl9VKSk9eZs+AlBVmsZUh1VBYPEshsOAYWCqyjqnWUXLX8LJ1JvZnsDSqyZgoAadfPZTiVjblIjvGolMhXclpUweSCo8WDbZ+THMnlT7LzScdX66TIsMcIeLGy0aZiOAN/rtqIglZ4YT/LbGsLP/QG5cj+ZP8bCLHc4unf5wulBtBJ+Vb9TJtebm4oqGWQ5sbn91ghcTrZgZArDsEQAAAABJRU5ErkJggg=="
                alt="Logout"
              />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
