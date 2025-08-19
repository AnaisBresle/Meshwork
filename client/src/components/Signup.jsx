import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { setUser } = useSession();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const displayError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 3000);
  };

  const validatePassword = () => {
    if (password !== password2) {
      displayError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) return;

    try {
      const response = await api.post("/api/users/signup", {
        firstname,
        lastname,
        username,
        email,
        password,
      });

      const data = response.data;

      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
      });

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      displayError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Signup</h2>

      <input
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
        required
        autoComplete="given-name"
      />

      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
        required
        autoComplete="family-name"
      />

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
        required
        autoComplete="new-password"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Signup</button>
    </form>
  );
};

export default Signup;
