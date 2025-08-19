import React, { useState } from "react";
import logo from "../images/logo.png"; 
import placeholder2 from "../images/placeholder2.png"; 

export default function SignupPage({ onSignup }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        onSignup?.(); // optional callback
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error during signup");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SIDE - SIGNUP FORM */}
      <div className="flex w-full md:w-1/2 flex-col justify-center px-8 md:px-16 bg-white shadow-lg">
        <div className="w-full max-w-md mx-auto">
          {/* Logo */}
           <img className="h-68 w-auto mb-6 mx-auto" src={logo} alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already a member?{" "}
            <a
              href="/login"
              className="font-medium text-[#0071E3] hover:opacity-80"
            >
              Sign in
            </a>
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                name="first_name"
                type="text"
                required
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
              />
              <input
                name="last_name"
                type="text"
                required
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
              />
              <input
                name="username"
                type="text"
                required
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
              />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 p-2 text-gray-900 placeholder-gray-400 focus:border-[#0071E3] focus:ring-[#0071E3] sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-[#0071E3] py-2 px-4 text-sm font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            >
              Sign up
            </button>
          </form>
        </div>
      </div>

      {/* RIGHT SIDE - ILLUSTRATION */}
      <div className="hidden md:block w-1/2">
        <img
          src={placeholder2}
          alt="Signup illustration"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
