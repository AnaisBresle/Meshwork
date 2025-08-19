// client/src/api.js
import axios from "axios";

// Create an Axios instance with the base URL of your backend
const api = axios.create({
  baseURL: "http://localhost:3001", // make sure this matches your server port
  headers: {
    "Content-Type": "application/json",
  },
});

// Example API functions
export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const signupUser = async (userData) => {
  const response = await api.post("/signup", userData);
  return response.data;
};

export default api;
