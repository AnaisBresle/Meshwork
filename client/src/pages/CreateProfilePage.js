import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chatPattern from "../images/chat-pattern.png"; 
import { useSession } from '../contexts/SessionContext';


export default function CreateProfilePage() {
  const navigate = useNavigate();
const { setUser } = useSession();
  const [formData, setFormData] = useState({
    company: "",
    jobTitle: "",
    industry: "",
    bio: "",
    location: "",
    website: "",
    linkedIn: "",
  });

  const [loading, setLoading] = useState(false);

  // Handle typing in form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit to backend
  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3001/api/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      
      const data = await response.json();

      if (response.ok) {
        const userData = { id: data.userId, ...formData };
        setUser(userData); // store in session
  alert("Profile created successfully!");
        navigate(`/`);
      } else {
        alert(data.message || "Failed to create profile");
      }
    } catch (err) {
    console.error("Create profile error:", err);
  alert(err.message || "Error creating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-6 py-12 bg-white"
      style={{
        backgroundImage: `url(${chatPattern})`, 
        backgroundRepeat: "repeat",
        backgroundSize: "200px", 
      }}
    >
      {/* Overlay for watermark effect */}
      <div className="absolute inset-0 bg-white opacity-60"></div>

      {/* Form card */}
      <div className="relative w-full max-w-2xl bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
         ✏️ Create Your Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Job Title
            </label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Industry
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              rows="3"
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
            />
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
              placeholder="https://example.com"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              LinkedIn
            </label>
            <input
              type="url"
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 p-3 focus:ring-[#0071E3] focus:border-[#0071E3] sm:text-sm"
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-[#0071E3] px-6 py-2 text-white text-sm font-semibold hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-[#0071E3]"
            >
              {loading ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
