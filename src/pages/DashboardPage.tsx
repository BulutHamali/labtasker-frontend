import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome! Your projects will appear here.</p>
      <button
        onClick={logout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>
      <div className="mt-6">
        <Link
          to="/projects/123"
          className="text-blue-600 underline hover:text-blue-800"
        >
          View Example Project
        </Link>
      </div>
    </div>
  );
}
