import { useSession } from "../contexts/SessionContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const { setUser } = useSession();
  const navigate = useNavigate();

  const handleSignup = () => {
    const newUser = { id: 2, name: "Alice" };
    setUser(newUser);
    navigate("/"); // redirect after signup
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Signup;
