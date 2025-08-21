import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import FilterBar from "./components/FilterBar";
import Footer from "./components/Footer";
import CreateEvent from "./components/NewEvent";  
import NewPost from "./components/NewPost";       

import MainFeed from "./pages/MainFeed";
import ProfilePage from "./pages/ProfilePage";
import DirectoryPage from "./pages/DirectoryPage";
import EventsPage from "./pages/EventsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateProfilePage from "./pages/CreateProfilePage";
import { SessionProvider } from "./contexts/SessionContext";

// Layout = header + filters + (sidebar | page slot)
function Layout({ events, setEvents }) {
  const [filters, setFilters] = useState({
    category: "all",
    industry: "all",
    sort: "newest",
  });

  const handleFilters = (change) => {
    setFilters((prev) => ({ ...prev, ...change }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[var(--text-primary)]">
      {/* Navbar */}
      <NavBar />

      {/* Filters */}
      <FilterBar onChange={handleFilters} />

      {/* Main section with sidebar + page content */}
      <div className="flex flex-1 bg-[var(--background)]">
        <Sidebar />
        <main
          className="
            flex-1 p-6
            md:ml-60
            transition-all duration-300 ease-in-out
            max-w-4xl mx-auto
          "
        >
          <Outlet context={{ filters, events, setEvents }} />
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// A wrapper for protecting routes
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 👈 force logged in while developing
const [events, setEvents] = useState([]); 
  return (
    <SessionProvider>
      <Routes>
       {/* Public routes */}
        <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/signup" element={<SignupPage onSignup={() => setIsLoggedIn(true)} />} />
        <Route path="/create-profile" element={<CreateProfilePage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route element={<Layout events={events} setEvents={setEvents} />}>
            <Route index element={<MainFeed />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/create-post" element={<NewPost />} />
            <Route path="profile/:id" element={<ProfilePage />} />
            <Route path="directory" element={<DirectoryPage />} />
            <Route path="events" element={<EventsPage />} />
          </Route>
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />} />
      </Routes>
    </SessionProvider>
  );
}

