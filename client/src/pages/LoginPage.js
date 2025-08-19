import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";
import logo from "../images/logo.png"; 
import placeholderImage from "../images/placeholder.png"; 

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useSession();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser({
          id: data.user.id,
          firstname: data.user.firstname,
          lastname: data.user.lastname,
          username: data.user.username,
          email: data.user.email,
        });

        onLogin();
        navigate("/");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during login");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE - LOGIN FORM */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-8 md:px-16 bg-white shadow-lg">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
          <img className="h-68 w-auto mb-6 mx-auto" src={logo} alt="Logo" />
          <h2 className="text-3xl font-bold text-gray-900 text-center">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <a
              href="/signup"
              className="font-medium text-[#0071E3] hover:opacity-80"
            >
              create a new account
            </a>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="relative block w-full rounded-t-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="relative block w-full rounded-b-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-[#0071E3] py-2 px-4 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="hidden md:block w-1/2">
        <img
          src={placeholderImage}
          alt="Illustration placeholder"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
