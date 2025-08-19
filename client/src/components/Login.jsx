import { useSession } from "../contexts/SessionContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { setUser } = useSession();
  const navigate = useNavigate();

  const handleLogin = () => {
    const dummyUser = { id: 1, name: "John" };
    setUser(dummyUser);
    navigate("/"); // redirect after login
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
