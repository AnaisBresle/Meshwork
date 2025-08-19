import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const NavBar = () => {
  const { user, setUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);         // clear user from context
    localStorage.removeItem("user");
    localStorage.removeItem("authToken");
    navigate("/login");     // redirect to login page
  };

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-xl">Meshwork</Link>
      </div>

      <div className="flex gap-4">
        {!user && (
          <>
            <Link to="/login" className="text-blue-600">Login</Link>
            <Link to="/signup" className="text-blue-600">Signup</Link>
          </>
        )}

        {user && (
          <>
            <span>Welcome, {user.name || "User"}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
