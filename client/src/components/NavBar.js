import { useSession } from "../contexts/SessionContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { user, setUser } = useSession();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h1>Meshwork</h1>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <p>Not logged in</p>
      )}
    </nav>
  );
};

export default NavBar;
