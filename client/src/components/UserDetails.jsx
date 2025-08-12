import { useState, useEffect } from "react";
import { useSession } from "../contexts/SessionContext";
import api from "../api";

const UserDetails = () => {
  const { user, setUser } = useSession();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFormData({
      username: user.username,
      email: "",
      password: "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      alert("Please complete all fields.");
      return;
    }
    // API has a minimum length of 8 for password
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters.");
      return;
    }
    try {
      const response = await api.put(`/api/users/${user.id}`, formData);
      const data = response.data;

      setUser({
        username: data.username,
        id: data.id,
      });

      alert("Successfully updated account!");
    } catch (error) {
      console.error("Error updating details", error);
    }
  };

  return (
    <div>
      <h2>My Details</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default UserDetails;
